import "reflect-metadata";
import { injectable } from "inversify";
import { Subject } from "rxjs";
import { Broker } from "./broker.ts";
import { container, Symbols } from "./container.ts";

@injectable()
export class Publisher<T = unknown> {
  receiver: Subject<{ topic: string; payload: T }>;
  broker: Broker<T>;

  constructor() {
    this.broker = container.get<Broker<T>>(Symbols.Broker);
    this.receiver = new Subject();
    this.receiver.subscribe(this.broker.receiver);
  }
}
