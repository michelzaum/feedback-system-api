import type { Request, Response } from "express";
import type { DeleteUserUseCase } from "../useCases/deleteUserUseCase";
import type { IDeleteUserRequestParams } from "./interfaces/IDeleteUserRequestParams";
import {
  AccountDeletionBlockedError,
  AccountDeletionConflictError,
} from "../errors/accountDeletionErrors";

export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) { }

  async handle(request: Request<IDeleteUserRequestParams>, response: Response) {
    const { id } = request.params;

    // The account to delete always comes from the authenticated session,
    // never from client-supplied data: the path id is only checked against it.
    const authenticatedUserId = request.userId!;

    if (id !== authenticatedUserId) {
      return response.status(403).json({ error: "You can only delete your own account" });
    }

    try {
      await this.deleteUserUseCase.execute({ userId: authenticatedUserId });

      // Database-backed sessions (refresh tokens) were revoked with the user
      // inside the transaction; clear the auth cookies of this client too.
      return response.status(204)
        .clearCookie("token")
        .clearCookie("refreshToken")
        .send();
    } catch (error: any) {
      if (error instanceof AccountDeletionBlockedError) {
        return response.status(409).json({ error: error.message, organizations: error.organizations });
      }

      if (error instanceof AccountDeletionConflictError) {
        return response.status(409).json({ error: error.message });
      }

      if (error.message === "User not found") {
        return response.status(404).json({ error: error.message });
      }

      return response.status(400).json({ error: error.message });
    }
  }
}
