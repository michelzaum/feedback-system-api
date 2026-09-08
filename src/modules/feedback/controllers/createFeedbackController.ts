import type { Request, Response } from 'express';
import type { CreateFeedbackUseCase } from "../useCases/createFeedbackUseCase";
import type { ICreateFeedbackRequestBody } from './interfaces/ICreateFeedbackRequest';

export class CreateFeedbackController {
  constructor(private readonly createFeedbackUseCase: CreateFeedbackUseCase) { }

  async handle(request: Request<any, any, ICreateFeedbackRequestBody>, response: Response) {
    const { projectId, organizationId, title, description, statusId } = request.body;

    try {
      const feedback = await this.createFeedbackUseCase.execute({ title, description, projectId, organizationId, statusId });
      return response.status(201).json(feedback);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
