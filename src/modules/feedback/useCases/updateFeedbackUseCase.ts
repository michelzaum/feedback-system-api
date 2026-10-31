import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateFeedback } from "../interfaces/IUpdateFeedback";
import type { IFeedback } from "../interfaces/IFeedback";
import { BaseUseCase } from "../../../shared/useCases/BaseUseCase";

export class UpdateFeedbackUseCase extends BaseUseCase<IUpdateFeedback, IFeedback | undefined> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {
    super();
  }

  protected async executeInternal(data: IUpdateFeedback): Promise<IFeedback | undefined> {
    const feedbackExists = await this.feedbackRepository.findById(data.id);

    if (!feedbackExists) {
      throw new Error("Feedback not found");
    }

    return await this.feedbackRepository.update(data.id, {
      status: data.status,
    });
  }
}
