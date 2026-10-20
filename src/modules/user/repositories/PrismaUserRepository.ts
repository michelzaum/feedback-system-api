import { Prisma } from "../../../../generate/prisma/client";
import { prisma } from "../../../lib/prisma";
import type { IUser } from "../interfaces/IUser";
import type { ICreateUserRepositoryInput } from "./interfaces/ICreateUserRepository";
import type { IUserRepository } from "./interfaces/IUserRepository";
import {
  AccountDeletionBlockedError,
  AccountDeletionConflictError,
} from "../errors/accountDeletionErrors";
import { planAccountDeletion } from "../utils/accountOrganizations";

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUserRepositoryInput): Promise<IUser> {
    return prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<ICreateUserRepositoryInput>,
  ): Promise<IUser | undefined> {
    const updateData: {
      name?: string;
      email?: string;
      password_hash?: string;
    } = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.email !== undefined) {
      updateData.email = data.email;
    }

    if (data.password_hash !== undefined) {
      updateData.password_hash = data.password_hash;
    }

    return await prisma.users.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.users.delete({
      where: { id },
    });
  }

  // Deletes the user account atomically. All decisions come from the
  // account-deletion helpers; this method only executes database logic:
  //   1. inside a Serializable transaction, re-reads the user's memberships
  //      and re-runs the same planAccountDeletion helper the use case used,
  //      so concurrent membership or role changes cannot leave an
  //      organization without an admin nor orphan any organization;
  //   2. deletes the sole-member organizations from the fresh plan
  //      (cascades to projects, feedbacks and memberships at the database
  //      level, per the existing foreign key rules);
  //   3. deletes the user, which cascades to the remaining memberships and
  //      to all refresh tokens (database-backed sessions).
  async deleteAccount(userId: string): Promise<void> {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.users.findUnique({
            where: { id: userId },
            select: { id: true },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const userMemberships = await tx.memberships.findMany({
            where: { userId },
            include: { organization: { select: { name: true } } },
          });

          const organizationIds = userMemberships.map(
            (membership) => membership.organizationId,
          );

          const organizationMemberships =
            organizationIds.length > 0
              ? await tx.memberships.findMany({
                  where: { organizationId: { in: organizationIds } },
                })
              : [];

          const organizationNames = new Map(
            userMemberships.map((membership) => [
              membership.organizationId,
              membership.organization.name,
            ]),
          );

          const plan = planAccountDeletion(
            userId,
            organizationMemberships.map((membership) => ({
              organizationId: membership.organizationId,
              organizationName:
                organizationNames.get(membership.organizationId) ?? "",
              userId: membership.userId,
              role: membership.role,
            })),
          );

          // Same rule as the use case, re-checked on fresh data inside the
          // transaction so a concurrent role change cannot be missed.
          if (plan.organizationsRequiringAdminTransfer.length > 0) {
            throw new AccountDeletionBlockedError(
              plan.organizationsRequiringAdminTransfer,
            );
          }

          if (plan.organizationIdsToDelete.length > 0) {
            await tx.organizations.deleteMany({
              where: { id: { in: plan.organizationIdsToDelete } },
            });
          }

          await tx.users.delete({
            where: { id: userId },
          });
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      // P2034: transaction conflicted with another concurrent write
      // (serialization failure / deadlock) — surface as a retryable conflict.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        throw new AccountDeletionConflictError();
      }

      throw error;
    }
  }

  async findById(id: string): Promise<IUser | null> {
    return await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password_hash: true,
        createdAt: true,
      },
    });
  }
}
