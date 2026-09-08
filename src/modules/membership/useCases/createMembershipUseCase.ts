import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateMembership } from "../interfaces/ICreateMembership";
import type { IMembership } from "../interfaces/IMembership";
import type { ICreateMembershipRepositoryInput } from "../repositories/interfaces/ICreateMembershipRepository";

export class CreateMembershipUseCase implements IUseCase<ICreateMembership, IMembership> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: ICreateMembership): Promise<IMembership> {
    const membershipExists = await this.membershipRepository.findMembership(
      data.organizationId,
      data.userId,
    );

    if (membershipExists) {
      throw new Error("Membership already exists");
    }

    const newMembership: ICreateMembershipRepositoryInput = {
      organizationId: data.organizationId,
      userId: data.userId,
      role: data.role,
    };

    return await this.membershipRepository.create(newMembership);
  }
}
