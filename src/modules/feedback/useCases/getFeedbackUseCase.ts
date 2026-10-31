import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IGetFeedback } from "../interfaces/IGetFeedback";
import type { IFeedback } from "../interfaces/IFeedback";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class GetFeedbackUseCase extends BaseUseCase<IGetFeedback, IFeedback | null> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {
    super();
  }

  protected async executeInternal(data: IGetFeedback): Promise<IFeedback | null> {
    return await this.feedbackRepository.findById(data.id);
  }
}
