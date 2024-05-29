import "reflect-metadata";
import { injectable } from "inversify";
import { container, Symbols } from "./container.ts";
import { Publisher } from "./publisher.ts";
import { Subscriber } from "./subscriber.ts";
import { TopicProxy } from "./proxy.ts";

@injectable()
export class Client<T = unknown> {
  readonly #publisher: Publisher<T>;
  #topicProxy!: TopicProxy<T>;

  constructor() {
    this.#publisher = container.get(Symbols.Publisher);
  }

  publish(topic: string, payload: T) {
    if (!this.#topicProxy) {
      this.#topicProxy = this.#getTopicProxy(topic);
    }
    this.#publisher.receiver.next({
      topic,
      payload,
    });
  }

  subscribe(topic: string, callback: (payload: T) => void) {
    if (!this.#topicProxy) {
      this.#topicProxy = this.#getTopicProxy(topic);
    }
    const subscriber = new Subscriber(this.#topicProxy as any);
    subscriber.receiver.subscribe(callback);
    this.#topicProxy.hasSubscribe();
  }

  #getTopicProxy(topic: string) {
    const proxyFactory = container.get<(topic: string) => TopicProxy>(
      Symbols.TopicProxyFactory,
    );
    const proxy = proxyFactory(topic) as TopicProxy<T>;
    proxy.setTopic(topic);
    return proxy;
  }
}
