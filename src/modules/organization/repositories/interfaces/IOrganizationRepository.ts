import type { IOrganization } from "../../interfaces/IOrganization";
import type { ICreateOrganizationRepositoryInput } from "./ICreateOrganizationRepository";

export interface IOrganizationRepository {
  findBySlug(slug: string): Promise<IOrganization | null>;
  create(data: ICreateOrganizationRepositoryInput): Promise<IOrganization>;
  update(
    id: string,
    data: Partial<ICreateOrganizationRepositoryInput>,
  ): Promise<IOrganization | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IOrganization | null>;
}
