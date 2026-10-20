// Domain errors for the account deletion workflow. Carrying the affected
// organizations lets the controller return structured, actionable errors
// without leaking user data: only organization id and name are exposed.

import type { IOrganizationReference } from "../utils/accountOrganizations";

export class AccountDeletionBlockedError extends Error {
  constructor(public readonly organizations: IOrganizationReference[]) {
    super(
      "Account deletion blocked: you are the only admin of organizations that still have other members. Transfer administration to another member before deleting your account",
    );
    this.name = "AccountDeletionBlockedError";
  }
}

export class AccountDeletionConflictError extends Error {
  constructor() {
    super(
      "Account deletion conflicted with concurrent membership changes. Review your organizations and try again",
    );
    this.name = "AccountDeletionConflictError";
  }
}
