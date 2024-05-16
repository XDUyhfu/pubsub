import "reflect-metadata";
import { injectable } from "inversify";
import { ReplaySubject } from "rxjs";
import { Broker } from "./broker.ts";
import { container, Symbols } from "./container.ts";

@injectable()
export class Publisher<T = unknown> {
  receiver: ReplaySubject<{ topic: string; payload: T }>;
  broker: Broker<T>;

  constructor() {
    this.broker = container.get<Broker<T>>(Symbols.Broker);
    this.receiver = new ReplaySubject(0);
    this.receiver.subscribe(this.broker.receiver);
  }
}
