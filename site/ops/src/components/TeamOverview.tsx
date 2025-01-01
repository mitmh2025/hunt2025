import { type TeamData } from "../opsdata/types";

// Team HQ location + how to access
// primary/secondary contacts
// Team-wide email
// Maybe: a way to email the team? Or the primary/secondary contacts?
// Team goal
// Team values

export default function TeamOverview({ team }: { team: TeamData }) {
  return (
    <div>
      <p>
        Location:{" "}
        <>
          {team.registration.teamLocation === "Fully Remote" && (
            <>
              Fully Remote. Contact details:{" "}
              {team.registration.teamLocationDetailsRemote}
            </>
          )}
          {team.registration.teamLocation === "Room Not Required" && (
            <>
              Arranged their own space. Access details:{" "}
              {team.registration.teamLocationDetailsNoRoomRequested}
            </>
          )}
          {team.registration.teamLocation === "Room Requested" && (
            <>
              Requested a room.
              {/* TODO: add room assignment */}
            </>
          )}
        </>
      </p>
      <p>
        Primary Contact:{" "}
        <a href={`mailto:${team.registration.contactEmail}`}>
          {team.registration.contactName}
        </a>{" "}
        (
        <a href={`tel:${team.registration.contactPhone}`}>
          {team.registration.contactPhone}
        </a>
        )
      </p>
      <p>
        Secondary Contact:{" "}
        <a href={`mailto:${team.registration.secondaryContactEmail}`}>
          {team.registration.secondaryContactName}
        </a>{" "}
        (
        <a href={`tel:${team.registration.secondaryContactPhone}`}>
          {team.registration.secondaryContactPhone}
        </a>
        )
      </p>
      <p>
        Team-wide email:{" "}
        <a href={`mailto:${team.registration.teamEmail}`}>
          {team.registration.teamEmail}
        </a>
      </p>
      <p>Team Goal: {team.registration.teamGoal}</p>
      <p>
        Team Values: {team.registration.teamValues.join(", ")}{" "}
        {team.registration.teamValuesOther
          ? `, ${team.registration.teamValuesOther}`
          : null}
      </p>
    </div>
  );
}
