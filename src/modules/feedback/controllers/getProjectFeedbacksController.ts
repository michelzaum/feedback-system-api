import type { Request, Response } from "express";
import type { GetProjectFeedbacksUseCase } from "../useCases/getProjectFeedbacksUseCase";
import type { IGetFeedbacksByProjectRequest } from "./interfaces/IGetFeedbacksByProjectRequest";

export class GetProjectFeedbacksController {
  constructor(private readonly getProjectFeedbacksUseCase: GetProjectFeedbacksUseCase) { }

  async handle(request: Request<any, any, IGetFeedbacksByProjectRequest>, response: Response) {
    const { projectId } = request.params;

    try {
      const feedbacks = await this.getProjectFeedbacksUseCase.execute({ projectId });

      if (feedbacks.length === 0) {
        return response.status(404).json({ error: "No feedbacks found for this project" });
      }

      return response.json(feedbacks);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
