import type { IMembership } from "../../interfaces/IMembership";
import type { ICreateMembershipRepositoryInput } from "./ICreateMembershipRepository";

export interface IMembershipRepository {
  create(data: ICreateMembershipRepositoryInput): Promise<IMembership>;
  update(
    organizationId: string,
    userId: string,
    data: Partial<Pick<ICreateMembershipRepositoryInput, "role">>,
  ): Promise<IMembership | undefined>;
  delete(organizationId: string, userId: string): Promise<void>;
  findMembership(
    organizationId: string,
    userId: string,
  ): Promise<IMembership | null>;
}
