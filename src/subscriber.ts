import "reflect-metadata";
import { injectable } from "inversify";
import { ReplaySubject } from "rxjs";
import { container, Symbols } from "./container.ts";
import { Broker } from "./broker.ts";

@injectable()
export class Subscriber<T = unknown> {
  receiver: ReplaySubject<any>;
  broker: Broker<T>;

  constructor() {
    this.broker = container.get<Broker<T>>(Symbols.Broker);
    this.receiver = new ReplaySubject(0);

    this.broker.sender.subscribe(this.receiver);
  }
}
