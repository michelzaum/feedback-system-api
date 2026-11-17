import type { Request, Response } from "express";
import type { CreateFeedbackNoteUseCase } from "../useCases/createFeedbackNoteUseCase";
import type { ICreateFeedbackNoteRequestBody, IFeedbackNotesRequestParams } from "./interfaces/IFeedbackNotesRequest";

export class CreateFeedbackNoteController {
  constructor(private readonly createFeedbackNoteUseCase: CreateFeedbackNoteUseCase) {}

  async handle(request: Request<IFeedbackNotesRequestParams, any, ICreateFeedbackNoteRequestBody>, response: Response) {
    try {
      const note = await this.createFeedbackNoteUseCase.execute({
        ...request.params,
        authorId: request.userId!,
        content: request.body.content,
      });

      return response.status(201).json(note);
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
