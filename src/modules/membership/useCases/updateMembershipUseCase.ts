import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";
import type { IMembershipRepository } from "../repositories/interfaces/IMembershipRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateMembership } from "../interfaces/IUpdateMembership";
import type { IMembership } from "../interfaces/IMembership";

export class UpdateMembershipUseCase extends BaseUseCase<IUpdateMembership, IMembership | undefined> {
  constructor(private readonly membershipRepository: IMembershipRepository) {
    super();
  }

  protected async executeInternal(data: IUpdateMembership): Promise<IMembership | undefined> {
    return await this.membershipRepository.update(
      data.organizationId,
      data.userId,
      { role: data.role }
    );
  }
}
