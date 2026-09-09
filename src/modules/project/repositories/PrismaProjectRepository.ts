import { prisma } from "../../../lib/prisma";
import type { IProject } from "../interfaces/IProject";
import type { ICreateProjectRepositoryInput } from "./interfaces/ICreateProjectRepository";
import type { IProjectRepository } from "./interfaces/IProjectRepository";

export class PrismaProjectRepository implements IProjectRepository {
  async create(data: ICreateProjectRepositoryInput): Promise<IProject> {
    return prisma.projects.create({
      data: {
        name: data.name,
        description: data.description,
        slug: data.slug,
        organizationId: data.organizationId,
      },
    });
  }

  async update(
    id: string,
    data: Partial<ICreateProjectRepositoryInput>,
  ): Promise<IProject | undefined> {
    const updateData: { name?: string; description?: string; slug?: string } = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    if (data.slug !== undefined) {
      updateData.slug = data.slug;
    }

    return await prisma.projects.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.projects.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<IProject | null> {
    return await prisma.projects.findUnique({
      where: { id },
    });
  }

  async findProjectsByOrganizationId(organizationId: string): Promise<IProject[]> {
    return await prisma.projects.findMany({
      where: { organizationId },
    });
  }
}
