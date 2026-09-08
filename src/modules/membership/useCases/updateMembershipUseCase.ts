import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateMembership } from "../interfaces/IUpdateMembership";
import type { IMembership } from "../interfaces/IMembership";

export class UpdateMembershipUseCase implements IUseCase<IUpdateMembership, IMembership | undefined> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: IUpdateMembership): Promise<IMembership | undefined> {
    const membershipExists = await this.membershipRepository.findMembership(
      data.organizationId,
      data.userId,
    );

    if (!membershipExists) {
      throw new Error("Membership not found");
    }

    return await this.membershipRepository.update(
      data.organizationId,
      data.userId,
      { role: data.role },
    );
  }
}
