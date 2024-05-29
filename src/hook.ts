import { container, Symbols } from "./container.ts";
import { Client } from "./client.ts";
import { useRef, useCallback, useEffect } from "react";

export const useEmitter = <T = unknown>(topic: string) => {
  const clientRef = useRef<null | Client<T>>(null);
  if (!clientRef.current) {
    clientRef.current = container.get<Client<T>>(Symbols.Client);
  }
  useEffect(() => {
    return () => {
      clientRef.current = null;
    };
  }, []);

  return useCallback<(payload: T) => void>(
    (payload) => {
      clientRef.current?.publish(topic, payload);
    },
    [topic],
  );
};

export const useSubscriber = <T = unknown>(
  topic: string,
  callback: (result: T) => void,
) => {
  const clientRef = useRef<null | Client<T>>(null);
  if (!clientRef.current) {
    clientRef.current = container.get<Client<T>>(Symbols.Client);
  }
  useEffect(() => {
    return () => {
      clientRef.current = null;
    };
  }, []);
  clientRef.current?.subscribe(topic, callback);
};
