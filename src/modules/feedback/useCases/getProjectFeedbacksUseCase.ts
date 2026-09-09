import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IGetFeedbacksByProject } from "../interfaces/IGetFeedbacksByProject";
import type { IFeedback } from "../interfaces/IFeedback";

export class GetProjectFeedbacksUseCase implements IUseCase<IGetFeedbacksByProject, IFeedback[]> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) { }

  async execute(data: IGetFeedbacksByProject): Promise<IFeedback[]> {
    return await this.feedbackRepository.findManyByProjectId(data.projectId);
  }
}
