import "reflect-metadata";
import { injectable } from "inversify";
import { ReplaySubject, Subject } from "rxjs";

@injectable()
export class Broker<T = unknown> {
  receiver: Subject<{ topic: string; payload: T }>;
  sender: Subject<{ topic: string; payload: T }>;

  constructor() {
    this.receiver = new Subject();
    this.sender = new ReplaySubject(10);
    // 最简单的模型 直接传递数据
    this.receiver.subscribe(this.sender);
  }
}
