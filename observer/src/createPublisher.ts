export type Observer<T> = (value: T) => void;

export type Publisher<T> = {
  publish: (value: T) => void;
  subscribe: (observer: Observer<T>) => UnsubscribeFn;
};

type UnsubscribeFn = () => void;

export function createPublisher<T>(): Publisher<T> {
  let observers: Observer<T>[] = [];

  return {
    publish(value) {
      console.log({ value });
      observers.forEach((observer) => {
        observer(value);
      });
    },
    subscribe(observer) {
      observers.push(observer);

      return () => {
        observers = observers.filter((o) => o !== observer);
      };
    },
  };
}
