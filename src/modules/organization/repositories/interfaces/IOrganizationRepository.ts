import type { IOrganization } from "../../interfaces/IOrganization";
import type { ICreateOrganizationRepository } from "./ICreateOrganizationRepository";

export interface IOrganizationRepository {
  create(data: ICreateOrganizationRepository): Promise<IOrganization>;
  update(
    id: string,
    data: Partial<ICreateOrganizationRepository>,
  ): Promise<IOrganization | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IOrganization | null>;
}
