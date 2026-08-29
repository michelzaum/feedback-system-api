import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";

export class CreateOrganizationUseCase implements IUseCase<ICreateOrganization, IOrganization> {
  constructor(private readonly organizationRepository: IOrganizationRepository) { }

  async execute(data: ICreateOrganization): Promise<IOrganization> {
    return await this.organizationRepository.create(data);
  }
}
