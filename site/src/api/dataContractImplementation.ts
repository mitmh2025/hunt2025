import { timingSafeEqual } from "node:crypto";
import { stringify as csvStringifySync } from "csv-stringify/sync";
import { type NextFunction, type Request, type Response } from "express";
import { type Knex } from "knex";
import { type RecursiveRouterObj } from "node_modules/@ts-rest/express/src/lib/types";
import { type dataContract } from "../../lib/api/data_contract";
import { getTeamRegistrationLog } from "./db";
import { TeamInfoIntermediate } from "./logic";

export default function dataContractImplementation({
  knex,
  dataApiSecret,
}: {
  knex: Knex;
  dataApiSecret: string;
}): RecursiveRouterObj<typeof dataContract> {
  const dataAuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authQueryParam = Buffer.from(String(req.query.token ?? ""), "utf8");
    const expected = Buffer.from(dataApiSecret, "utf8");
    if (
      authQueryParam.length === expected.length &&
      timingSafeEqual(expected, authQueryParam)
    ) {
      next();
      return;
    } else {
      res.status(403).send("incorrect data API secret");
    }
  };
  return {
    getRegistrations: {
      middleware: [dataAuthMiddleware],
      handler: async () => {
        const regLog = await getTeamRegistrationLog(undefined, undefined, knex);

        const registrations = new Map<number, TeamInfoIntermediate>();
        regLog.forEach((entry) => {
          const prev =
            registrations.get(entry.team_id) ?? new TeamInfoIntermediate();
          registrations.set(entry.team_id, prev.reduce(entry));
        });

        return {
          status: 200,
          body: csvStringifySync(
            Array.from(registrations.values()).map((v) =>
              v.formatTeamRegistration(),
            ),
            {
              header: true,
              columns: [
                { key: "username", header: "Username" },
                { key: "name", header: "Team Name" },
                { key: "teamEmail", header: "Team Email" },

                // Team contact
                { key: "contactName", header: "Contact Name" },
                { key: "contactEmail", header: "Contact Email" },
                { key: "contactPhone", header: "Contact Phone" },
                {
                  key: "contactMailingAddress",
                  header: "Contact Mailing Address",
                },
                {
                  key: "secondaryContactName",
                  header: "Secondary Contact Name",
                },
                {
                  key: "secondaryContactEmail",
                  header: "Secondary Contact Email",
                },
                {
                  key: "secondaryContactPhone",
                  header: "Secondary Contact Phone",
                },

                // Team information
                { key: "teamGoal", header: "Team Goal" },
                { key: "teamValues", header: "Team Values" },
                { key: "teamValuesOther", header: "Team Values (Other)" },
                {
                  key: "teamExcitedAboutWinning",
                  header: "Excited About Winning",
                },
                { key: "teamYearEstablished", header: "Year Established" },
                { key: "teamMemberLocations", header: "Member Locations" },

                // Team location
                { key: "teamLocation", header: "Location Type" },
                {
                  key: "teamLocationDetailsRemote",
                  header: "Location Details (Remote)",
                },
                {
                  key: "teamLocationDetailsRoomRequest",
                  header: "Location Details (Room Requested)",
                },
                {
                  key: "teamLocationDetailsNoRoomRequested",
                  header: "Location Details (Room Not Required)",
                },

                // Team composition
                { key: "peopleTotal", header: "Total People" },
                { key: "peopleUndergrad", header: "Undergrads" },
                { key: "peopleGrad", header: "Grad Students" },
                { key: "peopleAlum", header: "Alums" },
                { key: "peopleStaff", header: "Faculty/Staff" },
                { key: "peopleAffiliates", header: "Affiliates" },
                { key: "peopleMinor", header: "Minors" },
                { key: "peopleOther", header: "Other People" },
                { key: "peopleOnCampus", header: "On Campus" },
                { key: "peopleRemote", header: "Remote" },
                {
                  key: "acceptUnattached",
                  header: "Accepting Unattached Hunters",
                },

                // Other
                { key: "referrer", header: "Referred By" },
                { key: "referrerOther", header: "Referred By (Other)" },
                { key: "otherNotes", header: "Other Notes" },
              ],
              cast: {
                object: (value) => {
                  if (Array.isArray(value)) {
                    return value.join(", ");
                  }
                  return JSON.stringify(value);
                },
              },
            },
          ),
        };
      },
    },
  };
}
