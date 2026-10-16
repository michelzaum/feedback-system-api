import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IDeleteProject } from "../interfaces/IDeleteProject";

export class DeleteProjectUseCase implements IUseCase<IDeleteProject, void> {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: IDeleteProject): Promise<void> {
    const projectExists = await this.projectRepository.findById(data.id);

    if (!projectExists) {
      throw new Error("Project not found");
    }

    const requesterMembership = await this.membershipRepository.findMembership(
      projectExists.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins from this organization can delete projects");
    }

    await this.projectRepository.delete(data.id);
  }
}
