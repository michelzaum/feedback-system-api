import type { IOrganizationRepository } from "../repositories/interfaces/IOrganizationRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";
import type { ICreateMembership } from "../../membership/interfaces/ICreateMembership";

export class CreateOrganizationUseCase implements IUseCase<ICreateOrganization, IOrganization> {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: ICreateOrganization): Promise<IOrganization> {
    const newOrganization = {
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
    }

    const organization = await this.organizationRepository.create(newOrganization);

    const membership: ICreateMembership = {
      organizationId: organization.id,
      userId: data.userId,
      role: 'ADMIN',
    };

    await this.membershipRepository.create(membership);

    return organization;
  }
}
