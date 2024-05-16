import "reflect-metadata";
import { injectable } from "inversify";
import { ReplaySubject } from "rxjs";

@injectable()
export class Broker<T = unknown> {
  receiver: ReplaySubject<{ topic: string; payload: T }>;
  sender: ReplaySubject<{ topic: string; payload: T }>;

  constructor() {
    this.receiver = new ReplaySubject(0);
    this.sender = new ReplaySubject(0);
    // 最简单的模型 直接传递数据
    this.receiver.subscribe(this.sender);
  }
}
