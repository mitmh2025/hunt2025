import { parse } from "csv-parse/sync";
import {
  ActivityLogParseOptions,
  type ActivityLogRow,
} from "../../archives/stats/activityLog";
import activityLogRaw from "../../archives/stats/assets/activity_log.csv?raw";

const parsedActivityLog = parse(
  activityLogRaw,
  ActivityLogParseOptions,
) as ActivityLogRow[];

export default parsedActivityLog;
