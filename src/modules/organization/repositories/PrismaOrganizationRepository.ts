import { prisma } from "../../../lib/prisma";
import type { ICreateOrganization } from "../interfaces/ICreateOrganization";
import type { IOrganization } from "../interfaces/IOrganization";
import type { IOrganizationRepository } from "./interfaces/IOrganizationRepository";

interface IPrismaCreateOrganization {
  name: string;
  slug: string;
}

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async create(data: IPrismaCreateOrganization): Promise<IOrganization> {
    return prisma.organizations.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
  }

  async update(
    id: string,
    data: Partial<ICreateOrganization>,
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
}
