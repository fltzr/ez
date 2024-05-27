type SideEffectFunction = (...args: unknown[]) => void;
type PrimaryFunction<T> = (...args: unknown[]) => T;

export const withSideEffect = <T>(
  fn: PrimaryFunction<T>,
  sideEffect: SideEffectFunction
): PrimaryFunction<T> => {
  return (...args: unknown[]): T => {
    sideEffect(...args);
    return fn(...args);
  };
};
