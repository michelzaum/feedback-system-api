import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateProject } from "../interfaces/ICreateProject";
import type { IProject } from "../interfaces/IProject";
import { createPublicProjectPath } from "./createPublicProjectPath";

export class CreateProjectUseCase implements IUseCase<ICreateProject, IProject> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: ICreateProject): Promise<IProject> {
    const organizationSlug = await this.projectRepository.findOrganizationSlug(data.organizationId);
    const slug = data.name.toLowerCase().replace(/ /g, "-");
    const newProject = {
      ...data,
      slug,
      url: createPublicProjectPath(organizationSlug, slug),
    };

    return await this.projectRepository.create(newProject);
  }
}
