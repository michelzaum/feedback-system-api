import { DeleteMembershipController } from "../controllers/deleteMembershipController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { DeleteMembershipUseCase } from "../useCases/deleteMembershipUseCase";

export function makeDeleteMembershipController() {
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const deleteMembershipUseCase = new DeleteMembershipUseCase(prismaMembershipRepository);

  return new DeleteMembershipController(deleteMembershipUseCase);
}
