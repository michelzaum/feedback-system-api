import type { IFeedback } from "../../interfaces/IFeedback";
import type { ICreateFeedbackRepositoryInput } from "./ICreateFeedbackRepository";
import type { IUpdateFeedbackRepositoryInput } from "./IUpdateFeedbackRepository";

export interface IFeedbackRepository {
  create(data: ICreateFeedbackRepositoryInput): Promise<IFeedback>;
  update(feedbackId: string, data: IUpdateFeedbackRepositoryInput): Promise<IFeedback | undefined>;
  findById(feedbackId: string): Promise<IFeedback | null>;
  findManyByProjectId(projectId: string): Promise<IFeedback[]>;
}
