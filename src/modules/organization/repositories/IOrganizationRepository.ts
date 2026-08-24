import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";

export interface IOrganizationRepository {
  create(data: ICreateOrganization): Promise<IOrganization>;
  update(
    id: string,
    data: Partial<ICreateOrganization>,
  ): Promise<IOrganization>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IOrganization | undefined>;
}
