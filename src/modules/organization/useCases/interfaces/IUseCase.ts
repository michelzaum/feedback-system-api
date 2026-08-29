export interface IUseCase {
  execute: () => Promise<void>;
}
