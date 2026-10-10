import type { ICreateOrganizationRepositoryInput } from "./interfaces/ICreateOrganizationRepository";
import type { ICreateMembershipRepositoryInput } from "../../membership/repositories/interfaces/ICreateMembershipRepository";
import type { IMembership } from "../../membership/interfaces/IMembership";
import type { IOrganization } from "../interfaces/IOrganization";
import type { IOrganizationRepository } from "./interfaces/IOrganizationRepository";

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  private organizations: IOrganization[] = [];
  private memberships: IMembership[] = [];

  create(
    organization: ICreateOrganizationRepositoryInput,
    membership: Omit<ICreateMembershipRepositoryInput, "organizationId">,
  ): Promise<IOrganization> {
    const createdOrganization = {
      id: this.organizations.length.toString(),
      name: organization.name,
      slug: organization.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.organizations.push(createdOrganization);

    this.memberships.push({
      organizationId: createdOrganization.id,
      userId: membership.userId,
      role: membership.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Promise.resolve(createdOrganization);
  }

  update(id: string, data: Partial<ICreateOrganizationRepositoryInput>): Promise<IOrganization | undefined> {
    this.organizations.forEach((item) => {
      if (item.id === id) {
        item.name = data.name ?? item.name;
        item.slug = data.slug ?? item.slug;
        item.updatedAt = new Date();
        return Promise.resolve(item);
      }
    });

    return Promise.resolve(undefined);
  }

  delete(id: string): Promise<void> {
    this.organizations = this.organizations.filter((item) => item.id !== id);
    return Promise.resolve();
  }

  findById(id: string): Promise<IOrganization | null> {
    const organization = this.organizations.find((organization) => organization.id === id) || null;
    return Promise.resolve(organization);
  }

  findBySlug(slug: string): Promise<IOrganization | null> {
    const organization = this.organizations.find((organization) => organization.slug === slug) || null;
    return Promise.resolve(organization);
  }
}
