import type { Request, Response } from "express";
import type { DeleteFeedbackNoteUseCase } from "../useCases/deleteFeedbackNoteUseCase";
import type { IFeedbackNotesRequestParams } from "./interfaces/IFeedbackNotesRequest";

interface IDeleteFeedbackNoteRequestParams extends IFeedbackNotesRequestParams {
  noteId: string;
}

export class DeleteFeedbackNoteController {
  constructor(private readonly deleteFeedbackNoteUseCase: DeleteFeedbackNoteUseCase) {}

  async handle(request: Request<IDeleteFeedbackNoteRequestParams>, response: Response) {
    try {
      await this.deleteFeedbackNoteUseCase.execute({
        ...request.params,
        requesterUserId: request.userId!,
      });

      return response.status(204).send();
    } catch (error: any) {
      if (error.message.includes("Only organization members")) {
        return response.status(403).json({ error: error.message });
      }

      if (error.message.includes("Only comment authors")) {
        return response.status(403).json({ error: error.message });
      }

      if (error.message === "Feedback not found" || error.message === "Feedback comment not found") {
        return response.status(404).json({ error: error.message });
      }

      return response.status(400).json({ error: error.message });
    }
  }
}
