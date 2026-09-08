import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectById } from "../interfaces/IFindProjectById";
import type { IProject } from "../interfaces/IProject";

export class FindProjectByIdUseCase implements IUseCase<IFindProjectById, IProject | null> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IFindProjectById): Promise<IProject | null> {
    return await this.projectRepository.findById(data.id);
  }
}
