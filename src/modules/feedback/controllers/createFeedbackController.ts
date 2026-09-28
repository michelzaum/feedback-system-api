import type { Request, Response } from 'express';
import type { CreateFeedbackUseCase } from "../useCases/createFeedbackUseCase";
import type { ICreateFeedbackRequestBody } from './interfaces/ICreateFeedbackRequest';
import type { ICreateFeedbackRequestParams } from './interfaces/ICreateFeedbackRequestParams';

export class CreateFeedbackController {
  constructor(private readonly createFeedbackUseCase: CreateFeedbackUseCase) { }

  async handle(request: Request<ICreateFeedbackRequestParams, any, ICreateFeedbackRequestBody>, response: Response) {
    const { organizationId, projectId } = request.params;
    const { title, description } = request.body;

    try {
      const feedback = await this.createFeedbackUseCase.execute({ title, description, projectId, organizationId });
      return response.status(201).json(feedback);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
