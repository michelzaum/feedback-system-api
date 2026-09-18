import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindMyProjects } from "../interfaces/IFindMyProjects";
import type { IProject } from "../interfaces/IProject";

export class FindMyProjectsUseCase implements IUseCase<IFindMyProjects, IProject[]> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IFindMyProjects): Promise<IProject[]> {
    return await this.projectRepository.findProjectsByUserId(data.userId);
  }
}
