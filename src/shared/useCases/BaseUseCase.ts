import type { IUseCase } from "../interfaces/IUseCase";

export abstract class BaseUseCase<I, O> implements IUseCase<I, O> {
  /**
   * Subclasses should implement business logic in this method.
   * The base execute method will call this.
   */
  protected abstract executeInternal(data: I): Promise<O>;

  async execute(data: I): Promise<O> {
    return this.executeInternal(data);
  }
}
