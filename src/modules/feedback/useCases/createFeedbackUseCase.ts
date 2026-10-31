import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateFeedback } from "../interfaces/ICreateFeedback";
import type { IFeedback } from "../interfaces/IFeedback";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class CreateFeedbackUseCase extends BaseUseCase<ICreateFeedback, IFeedback> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {
    super();
  }

  protected async executeInternal(data: ICreateFeedback): Promise<IFeedback> {
    return await this.feedbackRepository.create(data);
  }
}
