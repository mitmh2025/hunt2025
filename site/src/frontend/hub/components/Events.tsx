import React from "react";
import { styled } from "styled-components";
import { type EventDataWithTime } from "../../rounds/events/types";
import EventScheduleBg from "../assets/events.png";
import { defaultShadowFilter, getRelativeSizeCss } from "../constants";

const EventSchedule = styled.div`
  position: absolute;
  background-image: url(${EventScheduleBg});
  background-size: cover;
  top: ${getRelativeSizeCss(520)};
  left: ${getRelativeSizeCss(508)};
  width: ${getRelativeSizeCss(444)};
  height: ${getRelativeSizeCss(856)};
  padding: ${getRelativeSizeCss(60)};
  color: var(--black);
  transform: rotate(-1.3deg);
  text-align: center;
  font-size: ${getRelativeSizeCss(36)};
  filter: ${defaultShadowFilter};

  h3 {
    font-family: "Eccentric";
    margin: 0;
    padding: 0;
    font-size: ${getRelativeSizeCss(60)};
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .event {
    display: flex;
    flex-direction: column;
    gap: ${getRelativeSizeCss(4)};

    h5,
    p {
      margin: 0;
      padding: 0;
      line-height: 1.1;
    }

    h5 {
      font-family: "Playwrite";
      font-size: ${getRelativeSizeCss(30)};
      line-height: 1.6;
      font-weight: 400;
    }

    p {
      font-size: ${getRelativeSizeCss(24)};
    }
  }

  .event + .event {
    margin-top: ${getRelativeSizeCss(8)};
  }
`;

const Events = ({ events }: { events: EventDataWithTime[] }) => {
  return (
    <EventSchedule>
      <h3>Event Schedule</h3>
      <ul>
        {events.map((event) => (
          <li className="event" key={event.name}>
            <h5 className="event-name">{event.name}</h5>
            <p className="event-time">{event.time}</p>
            <p className="event-location">{event.location}</p>
          </li>
        ))}
      </ul>
    </EventSchedule>
  );
};

export default Events;
