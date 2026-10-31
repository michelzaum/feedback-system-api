import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class CreateOrganizationUseCase extends BaseUseCase<ICreateOrganization, IOrganization> {
  constructor(private readonly organizationRepository: IOrganizationRepository) {
    super();
  }

  protected async executeInternal(data: ICreateOrganization): Promise<IOrganization> {
    const slug = data.name.toLowerCase().replace(/ /g, "-");

    const slugExists = await this.organizationRepository.findBySlug(slug);

    if (slugExists) {
      throw new Error("Organization slug already exists");
    }

    const newOrganization = {
      name: data.name,
      slug,
    }

    const membership = {
      userId: data.userId,
      role: 'ADMIN' as const,
    };

    return await this.organizationRepository.create(newOrganization, membership);
  }
}
