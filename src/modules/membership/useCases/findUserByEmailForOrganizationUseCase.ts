import type { IUserRepository } from "../../user/repositories/interfaces/IUserRepository";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUserPreview } from "../interfaces/IUserPreview";

export class FindUserByEmailForOrganizationUseCase implements IUseCase<{ organizationId: string; email: string }, IUserPreview> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) { }

  async execute(data: { organizationId: string; email: string }): Promise<IUserPreview> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("User not found");
    }


    const membership = await this.membershipRepository.findMembership(
      data.organizationId,
      user.id,
    );

    if (membership) {
      throw new Error("User is already a member of this organization");
    }

    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
