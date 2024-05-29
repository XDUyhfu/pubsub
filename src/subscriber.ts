import "reflect-metadata";
import { injectable } from "inversify";
import { TopicProxy } from "./proxy.ts";
import { Subject } from "rxjs";

@injectable()
export class Subscriber {
  receiver: Subject<any>;

  constructor(topicProxy: TopicProxy) {
    this.receiver = new Subject();
    topicProxy.getReceiver().subscribe(this.receiver);
  }
}
