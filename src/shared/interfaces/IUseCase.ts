export interface IUseCase<I, O> {
  execute: (data: I) => Promise<O>;
}
