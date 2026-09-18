import type { Request, Response } from "express";
import type { FindMyProjectsUseCase } from "../useCases/findMyProjectsUseCase";
import type { IFindMyProjectsRequest } from "./interfaces/IFindMyProjectsRequest";

export class FindMyProjectsController {
  constructor(private readonly findMyProjectsUseCase: FindMyProjectsUseCase) { }

  async handle(request: Request<any, any, IFindMyProjectsRequest>, response: Response) {
    const userId = request.userId;

    if (!userId) {
      return response.status(400).json({ error: "User ID is required" });
    }

    try {
      const projects = await this.findMyProjectsUseCase.execute({ userId });
      return response.json(projects);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
