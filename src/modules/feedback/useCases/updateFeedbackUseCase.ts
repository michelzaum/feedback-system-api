import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IUpdateFeedback } from "../interfaces/IUpdateFeedback";
import type { IFeedback } from "../interfaces/IFeedback";

export class UpdateFeedbackUseCase implements IUseCase<IUpdateFeedback, IFeedback | undefined> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) { }

  async execute(data: IUpdateFeedback): Promise<IFeedback | undefined> {
    const feedbackExists = await this.feedbackRepository.findById(data.feedbackId);

    if (!feedbackExists) {
      throw new Error("Feedback not found");
    }

    return await this.feedbackRepository.update(data.feedbackId, {
      status: data.status,
    });
  }
}
