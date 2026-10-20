import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUserRepository } from "../repositories/interfaces/IUserRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteUser } from "../interfaces/IDeleteUser";
import type { IMembersFromOrganization } from "../../membership/interfaces/IMembersFromOrganization";
import type { IMyOrganization } from "../../membership/interfaces/IMyOrganization";
import { AccountDeletionBlockedError } from "../errors/accountDeletionErrors";
import {
  planAccountDeletion,
  type IAccountMembershipRow,
} from "../utils/accountOrganizations";

function toMembershipRows(
  userId: string,
  memberships: IMyOrganization[],
  organizationMembers: IMembersFromOrganization[],
): IAccountMembershipRow[] {
  const rows: IAccountMembershipRow[] = [];

  for (const membership of memberships) {
    rows.push({
      organizationId: membership.id,
      organizationName: membership.name,
      userId,
      role: membership.role,
    });
  }

  for (const member of organizationMembers) {
    for (const organization of member.organizations) {
      rows.push({
        organizationId: organization.id,
        organizationName: organization.name,
        userId: member.id,
        role: organization.role,
      });
    }
  }

  return rows;
}

export class DeleteUserUseCase implements IUseCase<IDeleteUser, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: IDeleteUser): Promise<void> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const memberships = await this.membershipRepository.findManyByUserId(
      data.userId,
    );

    const organizationMembers =
      memberships.length > 0
        ? await this.membershipRepository.findManyMembersByOrganizationIds(
            memberships.map((membership) => membership.id),
          )
        : [];

    const plan = planAccountDeletion(
      data.userId,
      toMembershipRows(data.userId, memberships, organizationMembers),
    );

    // An organization with remaining members must never lose its only admin:
    // reject before any destructive change. The same rule is re-checked by
    // the repository inside the transaction to close race conditions.
    if (plan.organizationsRequiringAdminTransfer.length > 0) {
      throw new AccountDeletionBlockedError(
        plan.organizationsRequiringAdminTransfer,
      );
    }

    await this.userRepository.deleteAccount(data.userId);
  }
}
