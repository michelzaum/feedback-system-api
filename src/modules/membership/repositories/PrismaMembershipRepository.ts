import { prisma } from "../../../lib/prisma";
import type { IMembership } from "../interfaces/IMembership";
import type { ICreateMembershipRepositoryInput } from "./interfaces/ICreateMembershipRepository";
import type { IMembershipRepository } from "./interfaces/IMembershipRepository";

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
}
