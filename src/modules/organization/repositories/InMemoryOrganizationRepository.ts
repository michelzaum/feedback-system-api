import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";
import type { IOrganizationRepository } from "./IOrganizationRepository";

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  private organizations: IOrganization[] = [];

  create(data: ICreateOrganization): Promise<IOrganization> {
    const organization = {
      id: this.organizations.length.toString(),
      name: data.name,
      slug: data.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.organizations.push(organization);
    return Promise.resolve(organization);
  }
  update(id: string, data: Partial<ICreateOrganization>): Promise<IOrganization | undefined> {
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
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<IOrganization | undefined> {
    throw new Error("Method not implemented.");
  }
}
