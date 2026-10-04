import type { Request, Response } from "express";
import type { FindFeedbacksByOrganizationUseCase } from "../useCases/findFeedbacksByOrganizationUseCase";
import type { IFindFeedbacksByOrganizationRequest } from "./interfaces/IFindFeedbacksByOrganizationRequest";

export class FindFeedbacksByOrganizationController {
  constructor(private readonly findFeedbacksByOrganizationUseCase: FindFeedbacksByOrganizationUseCase) { }

  async handle(request: Request<IFindFeedbacksByOrganizationRequest>, response: Response) {
    const { organizationId } = request.params;

    try {
      const feedbacks = await this.findFeedbacksByOrganizationUseCase.execute({ organizationId });
      return response.json(feedbacks);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
