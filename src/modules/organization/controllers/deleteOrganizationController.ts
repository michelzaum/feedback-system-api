import type { Request, Response } from "express";
import type { DeleteOrganizationUseCase } from "../useCases/deleteOrganizationUseCase";

interface IDeleteOrganizationRequest {
  params: {
    id: string;
  };
}

export class DeleteOrganizationController {
  constructor(private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase) { }

  async handle(request: Request<any, any, IDeleteOrganizationRequest>, response: Response) {
    const { id } = request.params;

    try {
      await this.deleteOrganizationUseCase.execute({ id });

      return response.status(204).send();
    } catch (error: any) {
      if (error.message === "Organization not found") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}
