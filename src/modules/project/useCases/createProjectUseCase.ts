import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateProject } from "../interfaces/ICreateProject";
import type { IProject } from "../interfaces/IProject";

export class CreateProjectUseCase implements IUseCase<ICreateProject, IProject> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: ICreateProject): Promise<IProject> {
    const newProject = {
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, "-"),
    };

    return await this.projectRepository.create(newProject);
  }
}
