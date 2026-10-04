import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateProject } from "../interfaces/IUpdateProject";
import type { IProject } from "../interfaces/IProject";
import { createPublicProjectPath } from "./createPublicProjectPath";

export class UpdateProjectUseCase implements IUseCase<IUpdateProject, IProject | undefined> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IUpdateProject): Promise<IProject | undefined> {
    const projectExists = await this.projectRepository.findById(data.id);

    if (!projectExists) {
      throw new Error("Project not found");
    }

    const slug = data.name.toLowerCase().replace(/ /g, "-");
    const organizationSlug = await this.projectRepository.findOrganizationSlug(projectExists.organizationId);

    return await this.projectRepository.update(data.id, {
      name: data.name,
      description: data.description,
      slug,
      url: createPublicProjectPath(organizationSlug, slug),
    });
  }
}
