import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectsByOrganization } from "../interfaces/IFindProjectsByOrganization";
import type { IProject } from "../interfaces/IProject";

export class FindProjectByOrganizationUseCase implements IUseCase<IFindProjectsByOrganization, IProject[]> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IFindProjectsByOrganization): Promise<IProject[]> {
    return await this.projectRepository.findProjectsByOrganizationId(data.organizationId);
  }
}
