import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectBySlug } from "../interfaces/IFindProjectBySlug";
import type { IProject } from "../interfaces/IProject";

export class FindProjectBySlugUseCase implements IUseCase<IFindProjectBySlug, IProject | null> {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: IFindProjectBySlug): Promise<IProject | null> {
    const membership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!membership) {
      throw new Error("Only organization members can view projects");
    }

    return await this.projectRepository.findBySlug(data.organizationId, data.slug);
  }
}
