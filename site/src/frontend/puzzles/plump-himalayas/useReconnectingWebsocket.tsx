import { useEffect, useRef, useState } from "react";

export default function useReconnectingWebsocket({
  onMessage,
  wsUrl,
}: {
  onMessage: (message: string) => void;
  wsUrl: string;
}) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isInRetryWsTimeout, setIsInRetryWsTimeout] = useState(false);

  useEffect(() => {
    if (isInRetryWsTimeout) {
      return;
    }

    const client = new WebSocket(wsUrl);
    if (socketRef.current === null) {
      socketRef.current = client;
    }

    // Connection opened
    client.addEventListener("open", (_) => {
      console.log("Connection established");
    });

    // Listen for messages
    client.addEventListener("message", (event) => {
      onMessage(event.data as string);
    });

    // Connection error
    client.addEventListener("error", (event) => {
      console.log("Connection error", event);
      setIsInRetryWsTimeout(true);
      setTimeout(() => {
        setIsInRetryWsTimeout(false);
      }, 5000);
    });

    // Connection closed
    client.addEventListener("close", (event) => {
      console.log("Connection closed", event);
      if (!socketRef.current) {
        // component unmounted, don't try to retry
        return;
      }
      setIsInRetryWsTimeout(true);
      setTimeout(() => {
        setIsInRetryWsTimeout(false);
      }, 5000);
    });
    return () => {
      socketRef.current = null;
      client.close();
    };
  }, [isInRetryWsTimeout, onMessage, wsUrl]);

  return socketRef;
}
