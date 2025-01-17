import React, { useRef } from "react";
import { styled } from "styled-components";
import { type SocketState } from "../../../lib/SocketManager";
import diamondIcon from "../../assets/logo.svg";
import { type TeamVirtualInteractionsState } from "../interactions/types";
import type { EventsState } from "../rounds/events/types";
import { deviceMin, deviceMax } from "../utils/breakpoints";
import { BuyAnswerModal, ExchangeClueModal } from "./ClueModals";

const Nav = styled.nav`
  height: 3rem;
  width: 100%;
  position: relative; // Needed for z-index to do anything
  z-index: 100;
  background-color: var(--nav-bar-bg);

  @media print {
    display: none;
  }
`;

const NavItems = styled.ul`
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  width: 900px;
  max-width: 100%;
  list-style: none;

  display: flex;
  align-items: center;
  font-family: var(--headline-font);

  > li {
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  > li:first-child {
    margin-left: -1rem;

    a {
      padding: 0 1rem;
    }
  }

  > li:last-child {
    margin-right: -1rem;

    a {
      padding-right: 1rem;
    }
  }

  #home-sm {
    display: none;
  }

  @media ${deviceMin.lg} {
    width: calc(1080px - 1rem);
    padding: 0 2rem;

    a {
      padding: 0 1rem;
    }

    > li:first-child {
      margin-left: -2rem;

      a {
        padding: 0 2rem;
      }
    }

    > li:last-child {
      margin-right: -2rem;

      a {
        padding-right: 2rem;
      }
    }
  }

  @media ${deviceMax.sm} {
    #home-md {
      display: none;
    }

    #home-sm {
      display: block;
    }
  }
`;

const NavLink = styled.a`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.25rem;
  border: none;
  fill: var(--gray-100);
  color: var(--gray-100);
  text-shadow: none;
  inline-size: min-content;
  white-space: nowrap;
  min-height: 3rem;

  max-width: calc(480px - 3rem);

  @media ${deviceMax.sm} {
    max-width: 144px;
  }

  > span {
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    height: 2.5rem;
  }
`;

const TeamNameNavLink = styled(NavLink)`
  text-align: right;
  justify-content: flex-end;
  max-width: calc(280px - 3rem);

  @media ${deviceMax.md} {
    max-width: calc(320px - 3rem);
  }

  @media ${deviceMax.sm} {
    max-width: 144px;
  }

  > span {
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Dropdown = styled.li<{ $alignRight?: boolean }>`
  position: relative;

  > a {
    height: 100%;
    cursor: pointer;
  }

  > ul {
    display: none;
    background-color: #000000dd;
    position: absolute;
    top: 3rem;
    left: ${(props) => (props.$alignRight ? "auto" : 0)};
    right: ${(props) => (props.$alignRight ? 0 : "auto")};
    list-style: none;
    margin: 0;
    padding: 0;
    flex-direction: column;
    align-items: stretch;

    > li {
      display: flex;
      align-items: center;
      justify-content: ${(props) =>
        props.$alignRight ? "flex-end" : "flex-start"};
    }

    > li > a {
      height: 3rem;
      cursor: pointer;
      text-align: ${(props) => (props.$alignRight ? "right" : "left")};
      width: 100%;
      align-items: center;
      justify-content: ${(props) =>
        props.$alignRight ? "flex-end" : "flex-start"};
    }
  }

  &:hover,
  &:focus-within {
    > ul {
      display: flex;
      min-width: 100%;
    }
  }

  @media (${deviceMax.sm}) {
    position: static;
    > ul {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
    }
  }
`;

const TopLevelDropdown = styled(Dropdown)`
  @media ${deviceMin.lg} {
    > a {
      display: none;
    }

    > ul {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      position: relative;
      top: auto;
      left: auto;
    }
  }
`;

const SubDropdown = styled(Dropdown)`
  > ul {
    background-color: #000000cc;
  }
  @media ${deviceMax.md} {
    &:hover > ul,
    &:focus-within > ul {
      top: 0;
      left: 100%;
    }
  }

  @media (${deviceMax.sm}) {
    &:hover > ul,
    &:focus-within > ul {
      left: 50%;
      max-width: 50vw;
      width: 50vw;

      > li,
      > li > a {
        max-width: 50vw;
        width: 50vw;
      }
    }
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Currency = styled.div`
  margin: 0 0.25rem;
  white-space: nowrap;
  inline-size: min-content;
  font-size: 1.25rem;
`;

const ConnectionState = styled.div`
  margin: 0 0 0 0.25rem;
  text-wrap: nowrap;
  inline-size: min-content;
`;

export type NavBarRoundData = {
  title: string;
  href: string;
};

export type NavBarState = {
  epoch: number;
  rounds: NavBarRoundData[];
  currency: number;
  strongCurrency: number;
  virtualInteractions: TeamVirtualInteractionsState["interactions"];
};

function DisconnectedIcon() {
  return (
    <svg
      width="32px"
      height="32px"
      version="1.1"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m321.71 840.98c-9.9375-0.09375-19.5 3.7969-26.578 10.781l-134.26 134.26c-14.531 14.625-14.531 38.25 0 52.875 7.0312 7.0781 16.594 11.062 26.578 11.062s19.547-3.9844 26.578-11.062l134.02-133.97h-0.046875c7.0781-7.0312 11.062-16.594 11.062-26.578 0-9.9844-3.9844-19.547-11.062-26.578-6.9844-6.8906-16.453-10.781-26.297-10.781z"
        fill="#fff"
      />
      <path
        d="m348 533.72-52.875 53.156c-87.562 87.562-87.562 230.53 0 318.05 87.562 87.562 230.53 87.562 318.1 0l53.156-53.156c14.531-14.625 14.531-38.25 0-52.875l-265.22-265.18c-7.0312-7.0781-16.594-11.062-26.578-11.062s-19.547 3.9844-26.578 11.062zm26.578 79.734 212.06 212.06-26.297 26.297c-58.875 58.875-153.42 58.875-212.29 0-58.922-58.875-58.922-153.14 0-212.06z"
        fill="#fff"
      />
      <path
        d="m480.61 507.14-79.453 79.734v-0.046875c-14.531 14.625-14.531 38.25 0 52.875 14.625 14.531 38.25 14.531 52.875 0l79.734-79.453c7.0312-7.0312 11.016-16.594 11.016-26.531 0-9.9844-3.9844-19.547-11.016-26.578-7.0312-7.0781-16.594-11.062-26.578-11.062s-19.547 3.9844-26.578 11.062z"
        fill="#fff"
      />
      <path
        d="m666.37 655.22c-9.9844 0-19.547 3.9844-26.578 11.062l-79.453 79.453c-7.0781 7.0312-11.062 16.594-11.062 26.578s3.9844 19.547 11.062 26.578c14.625 14.531 38.25 14.531 52.875 0l79.734-79.734c14.531-14.625 14.531-38.25 0-52.875-7.0781-7.0781-16.641-11.062-26.578-11.062z"
        fill="#fff"
      />
      <path
        d="m1012.4 150.05c-9.8438 0.046875-19.312 4.0312-26.297 11.062l-134.26 133.97c-14.531 14.625-14.531 38.25 0 52.875 7.0312 7.0781 16.594 11.062 26.578 11.062s19.547-3.9844 26.578-11.062l134.02-133.97h-0.046875c14.578-14.625 14.578-38.25 0-52.875-7.0312-7.0781-16.594-11.062-26.578-11.062z"
        fill="#fff"
      />
      <path
        d="m745.78 229.45c-57.656 0-115.41 21.844-159.19 65.625l-52.875 52.875h0.046874c-7.0781 7.0312-11.062 16.594-11.062 26.578s3.9844 19.547 11.062 26.578l265.22 265.18h-0.046875c14.625 14.531 38.25 14.531 52.875 0l53.156-53.156c87.562-87.562 87.562-230.53 0-318.05-43.781-43.781-101.53-65.625-159.19-65.625zm0 74.484c38.297 0 76.594 14.578 106.03 44.016 58.922 58.875 58.922 153.42 0 212.34l-26.578 26.297-212.02-212.06 26.578-26.578c29.438-29.438 67.688-44.016 106.03-44.016z"
        fill="#fff"
      />
    </svg>
  );
}

function ConnectedIcon() {
  return (
    <svg
      width="32px"
      height="32px"
      version="1.1"
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m440.9 440.76-53.156 53.156c-87.562 87.562-87.562 230.53 0 318.05 87.562 87.562 230.76 87.562 318.32 0l52.875-52.875v0.046875c7.0781-7.0781 11.062-16.641 11.062-26.578 0-9.9844-3.9844-19.547-11.062-26.578l-265.22-265.18 0.046875-0.046876c-14.625-14.531-38.25-14.531-52.875 0zm26.578 79.734 212.06 212.06-26.578 26.578c-58.922 58.875-153.14 58.875-212.06 0-58.922-58.875-58.922-153.14 0-212.06z"
        fill="#fff"
      />
      <path
        d="m1012.5 150.1c-9.9375-0.046875-19.5 3.8438-26.578 10.828l-227.02 227.02v-0.046875c-14.531 14.625-14.531 38.25 0 52.875 7.0781 7.0781 16.641 11.062 26.578 11.062 9.9844 0 19.547-3.9844 26.578-11.062l227.02-226.74v0.046875c7.0781-7.0312 11.016-16.594 11.016-26.578s-3.9375-19.547-11.016-26.578c-7.0781-6.9844-16.641-10.875-26.578-10.828z"
        fill="#fff"
      />
      <path
        d="m652.97 322.31c-57.656 0-115.12 21.844-158.9 65.625l-52.875 52.875v-0.046875c-7.0781 7.0312-11.016 16.594-11.016 26.578s3.9375 19.547 11.016 26.578l265.22 265.18v0.046875c14.625 14.531 38.203 14.531 52.828 0l53.156-53.156c87.562-87.562 87.562-230.53 0-318.05-43.781-43.781-101.53-65.625-159.19-65.625zm0 74.484c38.297 0 76.594 14.578 106.03 44.016 58.875 58.875 58.875 153.42 0 212.34l-26.297 26.297-212.34-212.06 26.578-26.578c29.438-29.438 67.734-44.016 106.03-44.016z"
        fill="#fff"
      />
      <path
        d="m387.74 759.14-226.74 226.74 0.046875-0.046874c-7.0781 7.0312-11.062 16.594-11.062 26.578 0 9.9844 3.9844 19.547 11.062 26.578 14.625 14.531 38.203 14.531 52.828 0l227.02-227.02v0.046876c14.531-14.625 14.531-38.25 0-52.875-7.0312-7.0781-16.594-11.062-26.578-11.062s-19.547 3.9844-26.578 11.062z"
        fill="#fff"
      />
    </svg>
  );
}

const connectionStateLabels: { [key in SocketState]: string } = {
  connecting: "Connecting...",
  connected: "Live Updates Connected",
  "connected-waiting-hello": "Almost connected...",
  "reconnect-wait": "Live Updates Disconnected",
  closing: "Closing...",
  reconnecting: "Reconnecting...",
};

const NavBar = ({
  eventsState,
  info,
  state,
  socketState,
}: {
  eventsState: EventsState;
  info: { teamName: string };
  state: NavBarState;
  socketState: SocketState;
}) => {
  const exchangeModalRef = useRef<HTMLDialogElement>(null);
  const buyAnswerModalRef = useRef<HTMLDialogElement>(null);
  const { teamName } = info;
  const { rounds, currency, strongCurrency } = state;
  const started = rounds.length > 0;
  return (
    <Nav>
      <NavItems>
        <li>
          <NavLink href="/" id="home-md">
            <img
              className="photo"
              src={diamondIcon}
              alt="The Case of the Shadow Diamond: Home"
              title="Home"
            />
          </NavLink>
        </li>
        <TopLevelDropdown>
          <NavLink id="menu-md" tabIndex={0}>
            Menu
          </NavLink>
          <ul>
            <li id="home-sm">
              <NavLink href="/">Home</NavLink>
            </li>
            {started && (
              <>
                <SubDropdown>
                  <NavLink tabIndex={0}>Rounds</NavLink>
                  <ul>
                    {rounds.map((round) => (
                      <li key={round.href}>
                        <NavLink href={round.href}>{round.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                </SubDropdown>
                <li>
                  <NavLink href="/all_puzzles">All Puzzles</NavLink>
                </li>
              </>
            )}
            {started && (
              <li>
                <NavLink href="/activity_log">Activity Log</NavLink>
              </li>
            )}
            <SubDropdown>
              <NavLink tabIndex={0}>About</NavLink>
              <ul>
                <li>
                  <NavLink href="/about">How the Hunt Works</NavLink>
                </li>
                <li>
                  <NavLink href="/radio">Radio Instruction Booklet</NavLink>
                </li>
                <li>
                  <NavLink href="/health_and_safety">Health and Safety</NavLink>
                </li>
              </ul>
            </SubDropdown>
          </ul>
        </TopLevelDropdown>
        <Spacer />
        <NavLink href="/virtual_radio" title="Virtual WDNM 2π radio stream">
          📻
        </NavLink>
        {started && (
          <>
            <Currency title={`Keys: ${currency}`}>🗝️ {currency}</Currency>
            {strongCurrency > 0 ? (
              <Dropdown $alignRight>
                <NavLink tabIndex={0}>
                  <Currency title={`Clues: ${strongCurrency}`}>
                    🔎 {strongCurrency}
                  </Currency>
                </NavLink>
                <ul>
                  <li>
                    <NavLink
                      onClick={() => {
                        exchangeModalRef.current?.showModal();
                      }}
                    >
                      Exchange 1 🔎 for 3 🗝️
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => {
                        buyAnswerModalRef.current?.showModal();
                      }}
                    >
                      Exchange 1 🔎 for a puzzle answer
                    </NavLink>
                  </li>
                </ul>
              </Dropdown>
            ) : (
              <Currency title={`Clues: ${strongCurrency}`}>
                🔎 {strongCurrency}
              </Currency>
            )}
          </>
        )}
        <Dropdown $alignRight={true}>
          <TeamNameNavLink tabIndex={0}>
            <span>{teamName}</span>
          </TeamNameNavLink>
          <ul>
            <li>
              <NavLink href="/team">Manage Team</NavLink>
            </li>
            <li>
              <NavLink href="/contact">Contact HQ</NavLink>
            </li>
            <li>
              <NavLink href="/logout">Log Out</NavLink>
            </li>
          </ul>
        </Dropdown>
        <Dropdown $alignRight>
          <NavLink tabIndex={0} style={{ padding: "4px 32px 0 0" }}>
            <ConnectionState>
              {socketState === "connected" ? (
                <ConnectedIcon />
              ) : (
                <DisconnectedIcon />
              )}
            </ConnectionState>
          </NavLink>
          <ul style={{ width: "250px", padding: "16px", fontSize: "18px" }}>
            <li>{connectionStateLabels[socketState]}</li>
          </ul>
        </Dropdown>
      </NavItems>
      <ExchangeClueModal
        ref={exchangeModalRef}
        onDismiss={() => {
          exchangeModalRef.current?.close();
        }}
      />
      <BuyAnswerModal
        ref={buyAnswerModalRef}
        onDismiss={() => {
          buyAnswerModalRef.current?.close();
        }}
        eventsState={eventsState}
      />
    </Nav>
  );
};

export default NavBar;
