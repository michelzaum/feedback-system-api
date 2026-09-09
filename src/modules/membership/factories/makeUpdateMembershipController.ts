import { UpdateMembershipController } from "../controllers/updateMembershipController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { UpdateMembershipUseCase } from "../useCases/updateMembershipUseCase";

export function makeUpdateMembershipController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const updateMembershipUseCase = new UpdateMembershipUseCase(prismaMembershipRepository);

  return new UpdateMembershipController(updateMembershipUseCase);
}
