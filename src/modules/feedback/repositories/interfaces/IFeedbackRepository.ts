import type { IFeedback } from "../../interfaces/IFeedback";
import type { ICreateFeedbackRepositoryInput } from "./ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./IUpdateFeedbackRepository";

export interface IFeedbackRepository {
  create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback>;
  update(id: string, data: IUpdateFeedbackRepositoryInput): Promise<IFeedback | undefined>;
  findById(id: string): Promise<IFeedback | null>;
  findFeedbacksByProjectId(projectId: string): Promise<IFeedback[]>;
}
