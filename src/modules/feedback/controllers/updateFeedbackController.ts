import type { Request, Response } from "express";
import type { UpdateFeedbackUseCase } from "../useCases/updateFeedbackUseCase";
import type { IUpdateFeedbackRequestParams } from "./interfaces/IUpdateFeedbackRequestParams";
import type { IUpdateFeedbackRequestBody } from "./interfaces/IUpdateFeedbackRequestBody";

export class UpdateFeedbackController {
  constructor(private readonly updateFeedbackUseCase: UpdateFeedbackUseCase) { }

  async handle(request: Request<IUpdateFeedbackRequestParams, any, IUpdateFeedbackRequestBody>, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    try {
      const feedback = await this.updateFeedbackUseCase.execute({ id, status });

      if (!feedback) {
        return response.status(404).json({ error: "Feedback not found" });
      }

      return response.json(feedback);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
