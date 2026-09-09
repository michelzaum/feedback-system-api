import type { Request, Response } from "express";
import type { GetProjectFeedbacksUseCase } from "../useCases/getProjectFeedbacksUseCase";
import type { IGetFeedbacksByProjectRequest } from "./interfaces/IGetFeedbacksByProjectRequest";

export class GetProjectFeedbacksController {
  constructor(private readonly getProjectFeedbacksUseCase: GetProjectFeedbacksUseCase) { }

  async handle(request: Request<any, any, IGetFeedbacksByProjectRequest>, response: Response) {
    const { projectId } = request.params;

    try {
      const feedbacks = await this.getProjectFeedbacksUseCase.execute({ projectId });
      return response.json(feedbacks);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
