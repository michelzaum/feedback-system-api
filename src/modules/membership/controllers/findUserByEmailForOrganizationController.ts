import type { Request, Response } from 'express';
import type { FindUserByEmailForOrganizationUseCase } from "../useCases/findUserByEmailForOrganizationUseCase";
import type { IFindUserByEmailForOrganizationRequestBody } from './interfaces/IFindUserByEmailForOrganizationRequest';

export class FindUserByEmailForOrganizationController {
  constructor(private readonly findUserByEmailForOrganizationUseCase: FindUserByEmailForOrganizationUseCase) { }

  async handle(request: Request<any, any, IFindUserByEmailForOrganizationRequestBody>, response: Response) {
    const { organizationId } = request.params;
    const { email } = request.body;

    if (!organizationId) {
      return response.status(400).json({ error: "organizationId is required" });
    }

    if (!email) {
      return response.status(400).json({ error: "email is required" });
    }

    try {
      const user = await this.findUserByEmailForOrganizationUseCase.execute({ organizationId, email });
      return response.status(200).json(user);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
