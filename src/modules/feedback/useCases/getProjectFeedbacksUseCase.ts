import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IGetFeedbacksByProject } from "../interfaces/IGetFeedbacksByProject";
import type { IFeedback } from "../interfaces/IFeedback";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class GetProjectFeedbacksUseCase extends BaseUseCase<IGetFeedbacksByProject, IFeedback[]> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {
    super();
  }

  protected async executeInternal(data: IGetFeedbacksByProject): Promise<IFeedback[]> {
    return await this.feedbackRepository.findManyByProjectId(data.projectId);
  }
}
