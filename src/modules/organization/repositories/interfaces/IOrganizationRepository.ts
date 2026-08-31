import type { IOrganization } from "../../interfaces/IOrganization";
import type { ICreateOrganizationRepositoryInput } from "./ICreateOrganizationRepository";

export interface IOrganizationRepository {
  create(data: ICreateOrganizationRepositoryInput): Promise<IOrganization>;
  update(
    id: string,
    data: Partial<ICreateOrganizationRepositoryInput>,
  ): Promise<IOrganization | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IOrganization | null>;
}
