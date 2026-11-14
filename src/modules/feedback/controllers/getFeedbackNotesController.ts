import type { Request, Response } from "express";
import type { GetFeedbackNotesUseCase } from "../useCases/getFeedbackNotesUseCase";
import type { IFeedbackNotesRequestParams } from "./interfaces/IFeedbackNotesRequest";

export class GetFeedbackNotesController {
  constructor(private readonly getFeedbackNotesUseCase: GetFeedbackNotesUseCase) {}

  async handle(request: Request<IFeedbackNotesRequestParams>, response: Response) {
    try {
      const notes = await this.getFeedbackNotesUseCase.execute({
        ...request.params,
        requesterUserId: request.userId!,
      });

      return response.json(notes);
    } catch (error: any) {
      if (error.message.includes("Only organization members")) {
        return response.status(403).json({ error: error.message });
      }

      if (error.message === "Feedback not found") {
        return response.status(404).json({ error: error.message });
      }

      return response.status(400).json({ error: error.message });
    }
  }
}
