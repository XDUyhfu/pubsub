import "reflect-metadata";
import { injectable } from "inversify";
import { container, Symbols } from "./container.ts";
import { Publisher } from "./publisher.ts";
import { Subscriber } from "./subscriber.ts";
import { filter, map } from "rxjs";

@injectable()
export class Client<T = unknown> {
  readonly #publisher: Publisher<T>;
  readonly #subscriber: Subscriber<T>;

  constructor() {
    this.#publisher = container.get(Symbols.Publisher);
    this.#subscriber = container.get(Symbols.Subscriber);
  }

  publish(topic: string, payload: T) {
    this.#publisher.receiver.next({
      topic,
      payload,
    });
  }

  subscribe(topic: string, callback: (payload: T) => void) {
    return this.#subscriber.receiver
      .pipe(
        filter(
          (message: { topic: string; payload: T }) => message.topic === topic,
        ),
        map((message) => message.payload),
      )
      .subscribe(callback);
  }

  getPublisher() {
    return this.#publisher;
  }

  getSubscriber() {
    return this.#subscriber;
  }
}
