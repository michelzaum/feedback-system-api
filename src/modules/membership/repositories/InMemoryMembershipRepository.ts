import type { IMembership } from "../interfaces/IMembership";
import type { ICreateMembershipRepositoryInput } from "./interfaces/ICreateMembershipRepository";
import type { IMembershipRepository } from "./interfaces/IMembershipRepository";
import type { IMember } from "../interfaces/IMember";
import type { IMyOrganization } from "../interfaces/IMyOrganization";
import type { IMembersFromOrganization } from "../interfaces/IMembersFromOrganization";

export class InMemoryMembershipRepository implements IMembershipRepository {
  private memberships: IMembership[] = [];

  create(data: ICreateMembershipRepositoryInput): Promise<IMembership> {
    const membership: IMembership = {
      organizationId: data.organizationId,
      userId: data.userId,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.memberships.push(membership);
    return Promise.resolve(membership);
  }

  update(
    organizationId: string,
    userId: string,
    data: Partial<Pick<ICreateMembershipRepositoryInput, "role">>,
  ): Promise<IMembership | undefined> {
    const membership = this.memberships.find(
      (item) => item.organizationId === organizationId && item.userId === userId,
    );

    if (!membership) {
      return Promise.resolve(undefined);
    }

    membership.role = data.role ?? membership.role;
    membership.updatedAt = new Date();

    return Promise.resolve(membership);
  }

  delete(organizationId: string, userId: string): Promise<void> {
    this.memberships = this.memberships.filter(
      (item) => !(item.organizationId === organizationId && item.userId === userId),
    );
    return Promise.resolve();
  }

  async findMembership(
    organizationId: string,
    userId: string,
  ): Promise<IMembership | null> {
    const membership =
      this.memberships.find(
        (item) => item.organizationId === organizationId && item.userId === userId,
      ) || null;
    return Promise.resolve(membership);
  }

  async findManyByOrganizationId(organizationId: string): Promise<IMember[]> {
    const memberships = this.memberships.filter((m) => m.organizationId === organizationId);
    return memberships.map((m) => ({
      id: m.userId,
      name: "",
      email: "",
      role: m.role,
    }));
  }

  async findManyByUserId(userId: string): Promise<IMyOrganization[]> {
    const memberships = this.memberships.filter((m) => m.userId === userId);
    // In-memory doesn't store organization data, return minimal info
    return memberships.map((m) => ({
      id: "",
      name: "",
      slug: "",
      role: m.role,
    }));
  }

  async findManyMembersByOrganizationIds(organizationIds: string[]): Promise<IMembersFromOrganization[]> {
    const memberships = this.memberships.filter((m) => organizationIds.includes(m.organizationId));
    const grouped = new Map<string, IMembersFromOrganization>();

    for (const m of memberships) {
      const userId = m.userId;
      const existing = grouped.get(userId);
      if (existing) {
        existing.organizations.push({ id: m.organizationId, name: m.organizationId });
      } else {
        grouped.set(userId, {
          id: m.userId,
          name: "",
          email: "",
          organizations: [{ id: m.organizationId, name: m.organizationId }],
        });
      }
    }

    return Array.from(grouped.values());
  }
}