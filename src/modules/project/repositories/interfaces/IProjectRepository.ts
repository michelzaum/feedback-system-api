import type { IProject } from "../../interfaces/IProject";
import type { ICreateProjectRepositoryInput } from "./ICreateProjectRepository";

export interface IProjectRepository {
  create(data: ICreateProjectRepositoryInput): Promise<IProject>;
  update(
    id: string,
    data: Partial<ICreateProjectRepositoryInput>,
  ): Promise<IProject | undefined>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<IProject | null>;
  findProjectsByOrganizationId(organizationId: string): Promise<IProject[]>;
}
