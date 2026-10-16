import { prisma } from "../../../lib/prisma";
import type { IOrganization } from "../interfaces/IOrganization";
import type { ICreateOrganizationRepositoryInput } from "./interfaces/ICreateOrganizationRepository";
import type { ICreateMembershipRepositoryInput } from "../../membership/repositories/interfaces/ICreateMembershipRepository";
import type { IOrganizationRepository } from "./interfaces/IOrganizationRepository";

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async create(
    organization: ICreateOrganizationRepositoryInput,
    membership: Omit<ICreateMembershipRepositoryInput, "organizationId">,
  ): Promise<IOrganization> {
    return prisma.$transaction(async (tx) => {
      const createdOrganization = await tx.organizations.create({
        data: {
          name: organization.name,
          slug: organization.slug,
        },
      });

      await tx.memberships.create({
        data: {
          organizationId: createdOrganization.id,
          userId: membership.userId,
          role: membership.role,
        },
      });

      return createdOrganization;
    });
  }

  async update(
    id: string,
    data: Partial<ICreateOrganizationRepositoryInput>,
  ): Promise<IOrganization | undefined> {
    const updateData: { name?: string; slug?: string } = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.slug !== undefined) {
      updateData.slug = data.slug;
    }

    return await prisma.organizations.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.organizations.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<IOrganization | null> {
    return await prisma.organizations.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<IOrganization | null> {
    return await prisma.organizations.findUnique({
      where: { slug },
    });
  }
}
