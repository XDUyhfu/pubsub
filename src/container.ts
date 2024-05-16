import { Container } from "inversify";
import { Publisher } from "./publisher.ts";
import { Subscriber } from "./subscriber.ts";
import { Broker } from "./broker.ts";
import { Client } from "./client.ts";

export const Symbols = {
  Publisher: Symbol.for("Publisher"),
  Subscriber: Symbol.for("Subscriber"),
  Broker: Symbol.for("Broker"),
  Client: Symbol.for("Client"),
  FactoryPublisher: Symbol.for("FactoryPublisher"),
  FactorySubscriber: Symbol.for("FactorySubscriber"),
};

export const container = new Container();
container.bind<Broker>(Symbols.Broker).to(Broker).inSingletonScope();
container.bind<Publisher>(Symbols.Publisher).to(Publisher).inRequestScope();
container.bind<Subscriber>(Symbols.Subscriber).to(Subscriber).inRequestScope();
container.bind<Client>(Symbols.Client).to(Client).inRequestScope();
// 工厂
container
  .bind<() => Publisher>(Symbols.FactoryPublisher)
  .toFactory<Publisher>(
    (context) => () => context.container.get<Publisher>(Symbols.Publisher),
  );
container
  .bind<() => Subscriber>(Symbols.FactorySubscriber)
  .toFactory<Subscriber>(
    (context) => () => context.container.get<Subscriber>(Symbols.Subscriber),
  );
