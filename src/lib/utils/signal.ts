import { effect, Signal, signal } from "@preact/signals";

type SignalOptions<TValue extends any = any> = {
  onUpdate: (value: TValue) => void;
};
export const createSignal = <TValue extends any = any>(
  initialValue: TValue,
  options: SignalOptions<TValue>
): Signal<TValue> => {
  const value = signal(initialValue);
  effect(() => options.onUpdate(value.value));
  return value;
};
