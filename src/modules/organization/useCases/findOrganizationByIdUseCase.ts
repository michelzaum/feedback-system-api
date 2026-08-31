import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindOrganizationById } from "../interfaces/IFindOrganizationById";
import type { IOrganization } from "../interfaces/IOrganization";

export class FindOrganizationByIdUseCase implements IUseCase<IFindOrganizationById, IOrganization | null> {
  constructor(private readonly organizationRepository: IOrganizationRepository) { }

  async execute(data: IFindOrganizationById): Promise<IOrganization | null> {
    return await this.organizationRepository.findById(data.id);
  }
}
