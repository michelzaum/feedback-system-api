import type { IProjectRepository } from "../repositories/interfaces/IProjectRepository";
import type { IMembershipRepository } from "../../membership/repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateProject } from "../interfaces/ICreateProject";
import type { IProject } from "../interfaces/IProject";
import { createPublicProjectPath } from "./createPublicProjectPath";

export class CreateProjectUseCase implements IUseCase<ICreateProject, IProject> {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: ICreateProject): Promise<IProject> {
    const requesterMembership = await this.membershipRepository.findMembership(
      data.organizationId,
      data.requesterUserId,
    );

    if (!requesterMembership || requesterMembership.role !== "ADMIN") {
      throw new Error("Only admins from this organization can create projects");
    }

    const organizationSlug = await this.projectRepository.findOrganizationSlug(data.organizationId);
    const slug = data.name.toLowerCase().replace(/ /g, "-");

    const slugExists = await this.projectRepository.findBySlug(data.organizationId, slug);

    if (slugExists) {
      throw new Error("Project slug already exists");
    }

    const newProject = {
      ...data,
      slug,
      url: createPublicProjectPath(organizationSlug, slug),
    };

    return await this.projectRepository.create(newProject);
  }
}
