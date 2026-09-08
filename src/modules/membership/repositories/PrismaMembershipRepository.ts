import { prisma } from "../../../lib/prisma";
import type { IMembership } from "../interfaces/IMembership";
import type { ICreateMembershipRepositoryInput } from "./interfaces/ICreateMembershipRepository";
import type { IMembershipRepository } from "./interfaces/IMembershipRepository";
import type { IMember } from "../interfaces/IMember";

export class PrismaMembershipRepository implements IMembershipRepository {
  async create(data: ICreateMembershipRepositoryInput): Promise<IMembership> {
    return await prisma.memberships.create({
      data: {
        organizationId: data.organizationId,
        userId: data.userId,
        role: data.role,
      },
    });
  }

  async update(
    organizationId: string,
    userId: string,
    data: Partial<Pick<ICreateMembershipRepositoryInput, "role">>,
  ): Promise<IMembership | undefined> {
    return await prisma.memberships.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
      data: {
        ...(data.role !== undefined && { role: data.role }),
      },
    });
  }

  async delete(organizationId: string, userId: string): Promise<void> {
    await prisma.memberships.delete({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });
  }

  async findMembership(
    organizationId: string,
    userId: string,
  ): Promise<IMembership | null> {
    return await prisma.memberships.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    });
  }

  async findManyByOrganizationId(organizationId: string): Promise<IMember[]> {
    const memberships = await prisma.memberships.findMany({
      where: { organizationId },
      include: { users: true },
    });

    return memberships.map((membership) => ({
      id: membership.users.id,
      name: membership.users.name,
      email: membership.users.email,
      role: membership.role,
    }));
  }
}