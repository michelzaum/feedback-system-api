import type { Request, Response } from "express";
import type { GetFeedbackUseCase } from "../useCases/getFeedbackUseCase";
import type { IGetFeedbackRequest } from "./interfaces/IGetFeedbackRequest";

export class GetFeedbackController {
  constructor(private readonly getFeedbackUseCase: GetFeedbackUseCase) { }

  async handle(request: Request<any, any, IGetFeedbackRequest>, response: Response) {
    const { feedbackId } = request.params;

    try {
      const feedback = await this.getFeedbackUseCase.execute({ feedbackId });

      if (!feedback) {
        return response.status(404).json({ error: "Feedback not found" });
      }

      return response.json(feedback);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
