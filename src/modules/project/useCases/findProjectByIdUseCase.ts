import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectById } from "../interfaces/IFindProjectById";
import type { IProject } from "../interfaces/IProject";

export class FindProjectByIdUseCase implements IUseCase<IFindProjectById, IProject | null> {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: IFindProjectById): Promise<IProject | null> {
    const project = await this.projectRepository.findById(data.id);

    if (!project) {
      return null;
    }

    const membership = await this.membershipRepository.findMembership(
      project.organizationId,
      data.requesterUserId,
    );

    if (!membership) {
      throw new Error("Only organization members can view projects");
    }

    return project;
  }
}
