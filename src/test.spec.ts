import { describe, expect, test } from "vitest";
import { container, Symbols } from "./container.ts";
import { Client } from "./client.ts";
import { TopicProxy } from "./proxy.ts";

describe("client", () => {
  test("client pub and sub", () => {
    const client1 = container.get<Client<{ message: string }>>(Symbols.Client);
    const client2 = container.get<Client<{ message: string }>>(Symbols.Client);
    const client3 = container.get<Client<{ message: string }>>(Symbols.Client);
    const client4 = container.get<Client<{ message: string }>>(Symbols.Client);

    client1.publish("/test", { message: "test" });
    client2.publish("/test", { message: "test" });
    client3.publish("/test", { message: "test" });
    client4.publish("/test", { message: "test" });

    const client5 = container.get<Client<{ message: string }>>(Symbols.Client);
    client5.subscribe("/test", (payload) => {
      console.log("payload1", payload);
      // expect(payload.message).toBe("test");
    });
    const client6 = container.get<Client<{ message: string }>>(Symbols.Client);
    client6.subscribe("/test", (payload) => {
      console.log("payload2", payload);
      // expect(payload.message).toBe("test");
    });

    client4.publish("/test", { message: "test" });
    client4.publish("/test", { message: "test" });
    client4.publish("/test", { message: "test" });
  });

  // test("client pub sub instance", () => {
  //   const client1 = container.get<Client>(Symbols.Client);
  //   const client2 = container.get<Client>(Symbols.Client);
  //   expect(client1.getSubscriber()).not.toBe(client2.getSubscriber());
  // });

  test("proxy factory", () => {
    const proxyFactory1 = container.get<(topic: string) => TopicProxy>(
      Symbols.TopicProxyFactory,
    );
    const proxyFactory2 = container.get<(topic: string) => TopicProxy>(
      Symbols.TopicProxyFactory,
    );

    const topicProxy1 = proxyFactory1("/test");
    const topicProxy2 = proxyFactory2("/test");

    expect(topicProxy1).toBe(topicProxy2);
  });
});
