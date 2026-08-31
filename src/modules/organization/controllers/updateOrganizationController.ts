import type { Request, Response } from "express";
import type { UpdateOrganizationUseCase } from "../useCases/updateOrganizationUseCase";

interface IUpdateOrganizationRequestParams {
  id: string;
}

interface IUpdateOrganizationRequestBody {
  name: string;
}

export class UpdateOrganizationController {
  constructor(private readonly updateOrganizationUseCase: UpdateOrganizationUseCase) { }

  async handle(request: Request<IUpdateOrganizationRequestParams, any, IUpdateOrganizationRequestBody>, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      const organization = await this.updateOrganizationUseCase.execute({ id, name });

      if (!organization) {
        return response.status(404).json({ error: "Organization not found" });
      }

      return response.json(organization);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
