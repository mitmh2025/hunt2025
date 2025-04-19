import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  LineElement,
  LinearScale,
  Plugin,
  PointElement,
  Scale,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-luxon";
import Zoom from "chartjs-plugin-zoom";
import type { ZoomPluginOptions } from "chartjs-plugin-zoom/types/options";
import { DateTime } from "luxon";
import { styled } from "styled-components";
import { HuntEnd, HuntStart } from "./activityLog";

ChartJS.register(
  BarElement,
  CategoryScale,
  Colors,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  Zoom,
);

const LegendPaddingPlugin: Plugin = {
  id: "legendPadding",
  beforeInit(chart) {
    if (!chart.legend) return;
    const originalFit = chart.legend.fit;
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)();
      this.height += 15;
    };
  },
};

ChartJS.register(LegendPaddingPlugin);

export const Chart = styled.div<{ $aspectRatio?: number }>`
  position: relative;
  width: calc(100vw - 10rem);
  height: calc(${({ $aspectRatio = 0.5 }) => $aspectRatio} * (100vw - 10rem));
  background-color: var(--white);
`;

export const TimeAxisOptions = ({
  start = HuntStart,
  end = HuntEnd,
}: {
  start?: DateTime;
  end?: DateTime;
} = {}) => ({
  type: "time" as const,
  min: start.toJSDate().valueOf(),
  max: end.toJSDate().valueOf(),
  adapters: {
    date: {
      zone: "America/New_York",
    },
  },
  time: {
    unit: "hour" as const,
    displayFormats: {
      hour: "EEE h a",
    },
  },
});

export const ZoomConfig: ZoomPluginOptions = {
  pan: {
    enabled: true,
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    scaleMode: "xy",
  },
  limits: {
    x: { min: "original", max: "original" },
    y: { min: "original", max: "original" },
  },
};

export const generateTruncatedTick = function (
  this: Scale,
  value: string | number,
) {
  if (typeof value === "string") return value;

  const labels = this.getLabels();
  if (value < 0 || value >= labels.length) return value;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we just did a bounds check
  const label = labels[value]!;
  if (label.length < 25) return label;
  return `${label.slice(0, 25)}…`;
};
