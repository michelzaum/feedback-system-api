import type { IFeedbackRepository } from "../repositories/interfaces/IFeedbackRepository";
import type { IUseCase } from "../../../shared/interfaces/IUseCase";
import type { ICreateFeedback } from "../interfaces/ICreateFeedback";
import type { IFeedback } from "../interfaces/IFeedback";

export class CreateFeedbackUseCase implements IUseCase<ICreateFeedback, IFeedback> {
  constructor(private readonly feedbackRepository: IFeedbackRepository) { }

  async execute(data: ICreateFeedback): Promise<IFeedback> {
    return await this.feedbackRepository.create(data);
  }
}
