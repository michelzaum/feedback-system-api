// Maps the membership DTOs returned by the membership repository into the
// neutral IAccountMembershipRow rows consumed by the account-deletion
// helpers, so the use case and the repository feed the same rule functions.

import type { IMembersFromOrganization } from "../../membership/interfaces/IMembersFromOrganization";
import type { IMyOrganization } from "../../membership/interfaces/IMyOrganization";
import type { IAccountMembershipRow } from "./accountOrganizations";

export function toMembershipRows(
  userId: string,
  memberships: IMyOrganization[],
  organizationMembers: IMembersFromOrganization[],
): IAccountMembershipRow[] {
  const rows: IAccountMembershipRow[] = [];

  for (const membership of memberships) {
    rows.push({
      organizationId: membership.id,
      organizationName: membership.name,
      userId,
      role: membership.role,
    });
  }

  for (const member of organizationMembers) {
    for (const organization of member.organizations) {
      rows.push({
        organizationId: organization.id,
        organizationName: organization.name,
        userId: member.id,
        role: organization.role,
      });
    }
  }

  return rows;
}
