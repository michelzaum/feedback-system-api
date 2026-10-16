import type { IFeedback } from "../interfaces/IFeedback";
import type { IFindFeedbacksByOrganization } from "../interfaces/IFindFeedbacksByOrganization";
import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";

export class FindFeedbacksByOrganizationUseCase implements IUseCase<IFindFeedbacksByOrganization, IFeedback[]> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) { }

  async execute(data: IFindFeedbacksByOrganization): Promise<IFeedback[]> {
    return await this.feedbackRepository.findManyByOrganizationId(data.organizationId);
  }
}
