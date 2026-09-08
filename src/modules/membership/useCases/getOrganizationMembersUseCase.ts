import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IMember } from "../interfaces/IMember";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";

export class GetOrganizationMembersUseCase implements IUseCase<{ organizationId: string }, IMember[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: { organizationId: string }): Promise<IMember[]> {
    return await this.membershipRepository.findManyByOrganizationId(data.organizationId);
  }
}