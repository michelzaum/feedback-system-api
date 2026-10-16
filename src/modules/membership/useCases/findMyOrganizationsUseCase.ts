import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindMyOrganizations } from "../interfaces/IFindMyOrganizations";
import type { IMyOrganization } from "../interfaces/IMyOrganization";

export class FindMyOrganizationsUseCase implements IUseCase<IFindMyOrganizations, IMyOrganization[]> {
  constructor(private readonly membershipRepository: IMembershipRepository) { }

  async execute(data: IFindMyOrganizations): Promise<IMyOrganization[]> {
    return await this.membershipRepository.findManyByUserId(data.userId);
  }
}
