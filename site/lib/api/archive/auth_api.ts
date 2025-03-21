import { type ApiFetcher, type ClientInferResponses } from "@ts-rest/core";
import deepEqual from "deep-equal";
import { type z } from "zod";
import { authContract } from "../contract";
import { fetchTeamRegistrationLog, mutateTeamRegistrationLog } from "./log";
import { reduceTeamInfoIntermediate } from "./reducers";
import { ARCHIVE_TEAM_ID } from "./storage";

type BodyType<T extends keyof typeof authContract> = ClientInferResponses<
  (typeof authContract)[T],
  200
>["body"];

const clientApi: ApiFetcher = async ({ route, rawBody }) => {
  const routeName = Object.entries(authContract).find(
    ([_, value]) => value === route,
  )?.[0] as keyof typeof authContract | undefined;
  if (routeName === undefined) {
    throw new Error("Unknown route");
  }

  switch (routeName) {
    // These don't make sense in archive mode
    case "login":
    case "getJWKS":
    case "createRegistration":
      return {
        status: 400,
        body: {},
        headers: new Headers(),
      };

    case "getRegistration": {
      const teamRegistration = reduceTeamInfoIntermediate(
        fetchTeamRegistrationLog(),
      ).formatTeamRegistrationStateIfActive();
      if (!teamRegistration) {
        return {
          status: 404,
          body: {},
          headers: new Headers(),
        };
      }

      return {
        status: 200,
        body: teamRegistration satisfies BodyType<"getRegistration">,
        headers: new Headers(),
      };
    }

    case "updateRegistration": {
      const teamRegistrationLog = fetchTeamRegistrationLog();

      const previousRegistration =
        reduceTeamInfoIntermediate(
          teamRegistrationLog,
        ).formatTeamRegistrationStateIfActive();
      if (!previousRegistration) {
        return {
          status: 404,
          body: {},
          headers: new Headers(),
        };
      }

      const newRegistration = rawBody as z.infer<
        (typeof authContract)["updateRegistration"]["body"]
      >;

      const nameChanged = previousRegistration.name !== newRegistration.name;

      const { name: _, ...previousWithoutName } = previousRegistration;
      const { name: __, ...newWithoutName } = newRegistration;

      const otherChanged = !deepEqual(previousWithoutName, newWithoutName, {
        strict: true,
      });

      const newInfo = await mutateTeamRegistrationLog(
        teamRegistrationLog,
        async (mutator) => {
          if (nameChanged) {
            await mutator.appendLog({
              type: "team_name_changed",
              team_id: ARCHIVE_TEAM_ID,
              data: {
                name: newRegistration.name,
              },
            });
          }

          if (otherChanged) {
            await mutator.appendLog({
              type: "team_registration_updated",
              team_id: ARCHIVE_TEAM_ID,
              data: newWithoutName,
            });
          }

          return mutator.getTeamInfo().formatTeamRegistrationState();
        },
      );

      if (!newInfo) {
        return {
          status: 404,
          body: {},
          headers: new Headers(),
        };
      }

      return {
        status: 200,
        body: newInfo satisfies BodyType<"updateRegistration">,
        headers: new Headers(),
      };
    }

    default:
      throw new Error("Unknown route");
  }
};

export default clientApi;
