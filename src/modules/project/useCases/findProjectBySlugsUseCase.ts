import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectBySlugs } from "../interfaces/IFindProjectBySlugs";
import type { IProject } from "../interfaces/IProject";

export class FindProjectBySlugsUseCase implements IUseCase<IFindProjectBySlugs, IProject | null> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IFindProjectBySlugs): Promise<IProject | null> {
    return await this.projectRepository.findBySlugs(data.organizationSlug, data.projectSlug);
  }
}
