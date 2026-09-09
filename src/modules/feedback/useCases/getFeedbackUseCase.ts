import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { IGetFeedback } from "../interfaces/IGetFeedback";
import type { IFeedback } from "../interfaces/IFeedback";

export class GetFeedbackUseCase implements IUseCase<IGetFeedback, IFeedback | null> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) { }

  async execute(data: IGetFeedback): Promise<IFeedback | null> {
    return await this.feedbackRepository.findById(data.id);
  }
}
