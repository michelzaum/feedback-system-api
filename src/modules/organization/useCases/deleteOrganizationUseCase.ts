import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteOrganization } from "../interfaces/IDeleteOrganization";

export class DeleteOrganizationUseCase implements IUseCase<IDeleteOrganization, void> {
  constructor(private readonly organizationRepository: IOrganizationRepository) { }

  async execute(data: IDeleteOrganization): Promise<void> {
    const organizationExists = await this.organizationRepository.findById(data.id);

    if (!organizationExists) {
      throw new Error("Organization not found");
    }

    await this.organizationRepository.delete(data.id);
  }
}
