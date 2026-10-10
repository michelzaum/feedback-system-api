import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";
import type { ICreateMembershipRepositoryInput } from "../../membership/repositories/interfaces/ICreateMembershipRepository";

export class CreateOrganizationUseCase implements IUseCase<ICreateOrganization, IOrganization> {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: ICreateOrganization): Promise<IOrganization> {
    const slug = data.name.toLowerCase().replace(/ /g, "-");

    const slugExists = await this.organizationRepository.findBySlug(slug);

    if (slugExists) {
      throw new Error("Organization slug already exists");
    }

    const newOrganization = {
      ...data,
      slug,
    }

    const organization = await this.organizationRepository.create(newOrganization);

    const membership: ICreateMembershipRepositoryInput = {
      organizationId: organization.id,
      userId: data.userId,
      role: 'ADMIN',
    };

    await this.membershipRepository.create(membership);

    return organization;
  }
}
