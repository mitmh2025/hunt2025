import { useEffect, useRef } from "react";

function average(items: number[]) {
  return items.reduce((a, b) => a + b, 0) / items.length;
}

export default function useSyncedTime(): { getCurrentTime: () => number } {
  const currentOffsetRef = useRef(0);

  useEffect(() => {
    const samples: { rtt: number; offset: number }[] = [];
    let computedOffset = 0;
    let lastLoggedAt: number | null = null;

    function updateOffset() {
      const sortedSamples = samples.slice(0).sort((a, b) => {
        if (a.rtt < b.rtt) {
          return -1;
        } else if (a.rtt > b.rtt) {
          return 1;
        }
        return 0;
      });

      const samplesToAverage = sortedSamples.slice(0, 3);
      computedOffset = average(samplesToAverage.map((s) => s.offset));

      if (
        lastLoggedAt === null ||
        Math.abs(lastLoggedAt - computedOffset) > 100
      ) {
        lastLoggedAt = computedOffset;
        console.log("New timesync offset:", computedOffset);
      }

      currentOffsetRef.current = computedOffset;
    }

    function addSample(sample: { rtt: number; offset: number }) {
      if (samples.length >= 10) {
        samples.shift();
      }

      samples.push(sample);
      updateOffset();
    }

    function takeSample() {
      const startTime = Date.now();

      fetch("/currentTime")
        .then((resp) => {
          if (!resp.ok) {
            console.error("/currentTime returned an error:", resp.status);
            return;
          }
          return resp.text();
        })
        .then((timeStr) => {
          const serverTime = Number(timeStr);
          if (Number.isNaN(serverTime)) {
            console.error("/currentTime returned an invalid number:", timeStr);
            return;
          }

          const endTime = Date.now();
          const rtt = endTime - startTime;
          const offset = startTime + rtt / 2 - serverTime;

          addSample({ rtt, offset });

          if (samples.length < 10) {
            setTimeout(takeSample, 200);
          }
        })
        .catch((err: unknown) => {
          console.error("Failed to fetch /currentTime:", err);
        });
    }

    takeSample();
    const interval = setInterval(takeSample, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return {
    getCurrentTime: () => Date.now() - currentOffsetRef.current,
  };
}
