import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteProject } from "../interfaces/IDeleteProject";

export class DeleteProjectUseCase implements IUseCase<IDeleteProject, void> {
  constructor(private readonly projectRepository: IProjectRepository) { }

  async execute(data: IDeleteProject): Promise<void> {
    const projectExists = await this.projectRepository.findById(data.id);

    if (!projectExists) {
      throw new Error("Project not found");
    }

    await this.projectRepository.delete(data.id);
  }
}
