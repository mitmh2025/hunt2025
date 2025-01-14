import React, { useRef } from "react";
import { styled } from "styled-components";
import diamondIcon from "../../assets/logo.svg";
import type { EventsState } from "../rounds/events/types";
import { deviceMin, deviceMax } from "../utils/breakpoints";
import AudioControls from "./AudioControls";
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
  text-wrap: nowrap;
  min-height: 3rem;

  max-width: calc(480px - 3rem);

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
  text-wrap: nowrap;
  inline-size: min-content;
  font-size: 1.25rem;
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
  runningInteractions: {
    slug: string;
    title: string;
    virtual: boolean;
  }[];
};

const NavBar = ({
  eventsState,
  info,
  state,
  whepUrl,
}: {
  eventsState: EventsState;
  info: { teamName: string };
  state: NavBarState;
  whepUrl: string;
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
                <li>
                  <NavLink href="/timeline">The Timeline</NavLink>
                </li>
              </>
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
        <AudioControls whepUrl={whepUrl} />
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
        <Dropdown>
          <TeamNameNavLink tabIndex={0}>
            <span>{teamName}</span>
          </TeamNameNavLink>
          <ul>
            <li>
              <NavLink href="/team">Manage Team</NavLink>
            </li>
            {started && (
              <li>
                <NavLink href="/activity_log">Activity Log</NavLink>
              </li>
            )}
            <li>
              <NavLink href="/contact">Contact HQ</NavLink>
            </li>
            <li>
              <NavLink href="/logout">Log Out</NavLink>
            </li>
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
