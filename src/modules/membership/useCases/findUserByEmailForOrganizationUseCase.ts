import type { IUserRepository } from "../../user/repositories/interfaces/IUserRepository";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUserPreview } from "../interfaces/IUserPreview";

interface IFindUserByEmailInput {
  organizationId: string;
  email: string;
  requesterUserId: string;
}

export class FindUserByEmailForOrganizationUseCase implements IUseCase<IFindUserByEmailInput, IUserPreview> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: IFindUserByEmailInput): Promise<IUserPreview> {
    const requesterMembership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins can search users for organization");
    }

    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("User not found");
    }


    const membership = await this.membershipRepository.findMembership(
      data.organizationId,
      user.id,
    );

    if (membership) {
      throw new Error("User is already a member of this organization");
    }

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
