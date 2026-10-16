import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IFindProjectsByOrganization } from "../interfaces/IFindProjectsByOrganization";
import type { IProject } from "../interfaces/IProject";

export class FindProjectByOrganizationUseCase implements IUseCase<IFindProjectsByOrganization, IProject[]> {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: IFindProjectsByOrganization): Promise<IProject[]> {
    const membership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!membership) {
      throw new Error("Only organization members can view projects");
    }

    return await this.projectRepository.findProjectsByOrganizationId(data.organizationId);
  }
}
