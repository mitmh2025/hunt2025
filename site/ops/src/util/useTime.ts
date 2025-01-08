import { useState, useEffect } from "react";

export default function useTime(resolution = 60000) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, resolution);

    return () => {
      clearInterval(interval);
    };
  }, [resolution]);

  return {
    now: time,
    updateNow: () => {
      setTime(new Date());
    },
  };
}
