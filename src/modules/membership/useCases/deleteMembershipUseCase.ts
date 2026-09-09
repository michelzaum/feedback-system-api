import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteMembership } from "../interfaces/IDeleteMembership";

export class DeleteMembershipUseCase implements IUseCase<IDeleteMembership, void> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: IDeleteMembership): Promise<void> {
    const membershipExists = await this.membershipRepository.findMembership(
      data.organizationId,
      data.userId,
    );

    if (!membershipExists) {
      throw new Error("Membership not found");
    }

    await this.membershipRepository.delete(data.organizationId, data.userId);
  }
}
