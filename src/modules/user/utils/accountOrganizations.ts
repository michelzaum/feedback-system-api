// Shared, pure account-deletion rules for the organizations a user belongs to.
//
// Used by both the delete-user use case (precondition checks before any
// destructive change) and the Prisma user repository (in-transaction
// re-validation), so the rules exist in exactly one place and the
// repository layer only executes database logic.
//
// Classification per organization:
//   - sole member (no other members): the organization and its data are
//     deleted with the user account.
//   - only ADMIN with other members left: deletion is blocked until
//     administration is transferred to another member.
//   - otherwise (MEMBER, or ADMIN with another ADMIN): only the user's
//     membership is removed and the organization is preserved.

export interface IAccountMembershipRow {
  organizationId: string;
  organizationName: string;
  userId: string;
  role: string;
}

export interface IAccountOrganizationSummary {
  organizationId: string;
  organizationName: string;
  userRole: string;
  otherMembersCount: number;
  otherAdminsCount: number;
}

export interface IOrganizationReference {
  id: string;
  name: string;
}

export interface IAccountOrganizationsClassification {
  soleMemberOrganizationIds: string[];
  organizationsRequiringAdminTransfer: IOrganizationReference[];
  membershipOnlyOrganizationIds: string[];
}

export interface IAccountDeletionPlan {
  // Sole-member organizations: deleted together with the account.
  organizationIdsToDelete: string[];
  // Organizations with other members where the user is the only admin:
  // deletion must not proceed until administration is transferred.
  organizationsRequiringAdminTransfer: IOrganizationReference[];
}

// Flattens the memberships of the user's organizations (every member,
// including the user) into one summary per organization of the user.
export function buildAccountOrganizationSummaries(
  userId: string,
  rows: IAccountMembershipRow[],
): IAccountOrganizationSummary[] {
  const organizationsOfUser = new Map<string, string>();
  for (const row of rows) {
    if (row.userId === userId) {
      organizationsOfUser.set(row.organizationId, row.organizationName);
    }
  }

  const summaries: IAccountOrganizationSummary[] = [];

  for (const [organizationId, organizationName] of organizationsOfUser) {
    const userMembership = rows.find(
      (row) => row.organizationId === organizationId && row.userId === userId,
    );
    const otherMembers = rows.filter(
      (row) => row.organizationId === organizationId && row.userId !== userId,
    );

    summaries.push({
      organizationId,
      organizationName,
      userRole: userMembership?.role ?? "",
      otherMembersCount: otherMembers.length,
      otherAdminsCount: otherMembers.filter((row) => row.role === "ADMIN")
        .length,
    });
  }

  return summaries;
}

export function classifyAccountOrganizations(
  summaries: IAccountOrganizationSummary[],
): IAccountOrganizationsClassification {
  const soleMemberOrganizationIds: string[] = [];
  const organizationsRequiringAdminTransfer: IOrganizationReference[] = [];
  const membershipOnlyOrganizationIds: string[] = [];

  for (const summary of summaries) {
    if (summary.otherMembersCount === 0) {
      soleMemberOrganizationIds.push(summary.organizationId);
      continue;
    }

    if (summary.userRole === "ADMIN" && summary.otherAdminsCount === 0) {
      organizationsRequiringAdminTransfer.push({
        id: summary.organizationId,
        name: summary.organizationName,
      });
      continue;
    }

    membershipOnlyOrganizationIds.push(summary.organizationId);
  }

  return {
    soleMemberOrganizationIds,
    organizationsRequiringAdminTransfer,
    membershipOnlyOrganizationIds,
  };
}

// Single decision entry point for the account deletion workflow:
// given every membership row of the user's organizations, returns what
// must happen to each organization when the user deletes the account.
export function planAccountDeletion(
  userId: string,
  rows: IAccountMembershipRow[],
): IAccountDeletionPlan {
  const classification = classifyAccountOrganizations(
    buildAccountOrganizationSummaries(userId, rows),
  );

  return {
    organizationIdsToDelete: classification.soleMemberOrganizationIds,
    organizationsRequiringAdminTransfer:
      classification.organizationsRequiringAdminTransfer,
  };
}
