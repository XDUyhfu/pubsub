import "reflect-metadata";
import { injectable } from "inversify";
import { filter, Subject } from "rxjs";
import { Broker } from "./broker.ts";
import { container, Symbols } from "./container.ts";
import { controlCaching } from "./operator.ts";

@injectable()
export class TopicProxy<T = unknown> {
  receiver: Subject<any>;
  broker: Broker<T>;

  #topic: string = "/test";
  #control$ = new Subject();

  #hasSubscribe = false;

  constructor() {
    this.broker = container.get<Broker<T>>(Symbols.Broker);
    this.receiver = new Subject();
    this.#control$.subscribe();

    this.broker.sender
      .pipe(
        filter(
          (message: { topic: string; payload: T }) =>
            message.topic === this.#topic,
        ),
        controlCaching(this.#control$),
      )
      .subscribe(this.receiver);
  }

  setTopic(topic: string) {
    this.#topic = topic;
  }

  hasSubscribe() {
    if (!this.#hasSubscribe) {
      this.#control$.next(true);
      this.#hasSubscribe = true;
    }
  }

  getReceiver() {
    return this.receiver;
  }
}
