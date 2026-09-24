import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectBySlug } from "../interfaces/IFindProjectBySlug";
import type { IProject } from "../interfaces/IProject";

export class FindProjectBySlugUseCase implements IUseCase<IFindProjectBySlug, IProject | null> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IFindProjectBySlug): Promise<IProject | null> {
    return await this.projectRepository.findBySlug(data.organizationId, data.slug);
  }
}
