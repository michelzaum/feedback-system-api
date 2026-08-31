import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateOrganization } from "../interfaces/IUpdateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";

export class UpdateOrganizationUseCase implements IUseCase<IUpdateOrganization, IOrganization | undefined> {
  constructor(private readonly organizationRepository: IOrganizationRepository) { }

  async execute(data: IUpdateOrganization): Promise<IOrganization | undefined> {
    const organizationExists = await this.organizationRepository.findById(data.id);

    if (!organizationExists) {
      throw new Error("Organization not found");
    }

    const slug = data.name.toLowerCase().replace(/ /g, "-");

    return await this.organizationRepository.update(data.id, {
      name: data.name,
      slug,
    });
  }
}
