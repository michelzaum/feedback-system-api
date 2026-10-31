import type { IFeedback } from "../interfaces/IFeedback";
import type { IFindFeedbacksByOrganization } from "../interfaces/IFindFeedbacksByOrganization";
import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class FindFeedbacksByOrganizationUseCase extends BaseUseCase<IFindFeedbacksByOrganization, IFeedback[]> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {
    super();
  }

  protected async executeInternal(data: IFindFeedbacksByOrganization): Promise<IFeedback[]> {
    return await this.feedbackRepository.findManyByOrganizationId(data.organizationId);
  }
}
