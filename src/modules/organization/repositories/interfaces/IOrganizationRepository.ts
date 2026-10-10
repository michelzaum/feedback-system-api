import type { IOrganization } from "../../interfaces/IOrganization";
import type { ICreateOrganizationRepositoryInput } from "./ICreateOrganizationRepository";
import type { ICreateMembershipRepositoryInput } from "../../../membership/repositories/interfaces/ICreateMembershipRepository";

export interface IOrganizationRepository {
  findBySlug(slug: string): Promise<IOrganization | null>;
  create(
    organization: ICreateOrganizationRepositoryInput,
    membership: Omit<ICreateMembershipRepositoryInput, "organizationId">,
  ): Promise<IOrganization>;
  update(
    id: string,
    data: Partial<ICreateOrganizationRepositoryInput>,
  ): Promise<IOrganization | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IOrganization | null>;
}
