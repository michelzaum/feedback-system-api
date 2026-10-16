import { FindUserByEmailForOrganizationController } from "../controllers/findUserByEmailForOrganizationController";
import { PrismaMembershipRepository } from "../repositories/PrismaMembershipRepository";
import { PrismaUserRepository } from "../../user/repositories/PrismaUserRepository";
import { FindUserByEmailForOrganizationUseCase } from "../useCases/findUserByEmailForOrganizationUseCase";

export function makeFindUserByEmailForOrganizationController() {
  const prismaUserRepository = new PrismaUserRepository();
  const prismaMembershipRepository = new PrismaMembershipRepository();
  const findUserByEmailForOrganizationUseCase = new FindUserByEmailForOrganizationUseCase(prismaUserRepository, prismaMembershipRepository);

  return new FindUserByEmailForOrganizationController(findUserByEmailForOrganizationUseCase);
}
