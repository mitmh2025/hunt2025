import React from "react";
import RegsiteWrapper from "../RegsiteWrapper";

export default function RegistrationHome({
  isAuthed,
  registrationOpen,
}: {
  isAuthed: boolean;
  registrationOpen: boolean;
}) {
  return (
    <RegsiteWrapper>
      <div className="container">
        <section id="registration-button">
          {isAuthed && registrationOpen ? (
            <a className="button" href="/registration/new">
              Update your registration
            </a>
          ) : (
            <a
              className={`button ${!registrationOpen ? "disabled" : ""}`}
              href={registrationOpen ? "/registration/new" : "#"}
            >
              Register your team
            </a>
          )}
        </section>
        {registrationOpen && (
          <>
            {!isAuthed && (
              <section id="unattached-hunter-button">
                <a
                  className="button"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfBDLTjg8mOhWglnCn05QptQ30pqMRbSTx9RBM7Gyc2s-2Grw/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sign up as an individual
                </a>
              </section>
            )}
            <section id="registration-subtitle">
              {isAuthed ? (
                <p>
                  Or <a href="/logout">log out</a> to register a new team.
                </p>
              ) : (
                <p>
                  Or you can <a href="/login">log in</a> to update your
                  registration.
                </p>
              )}
            </section>
          </>
        )}
        <section id="updates">
          <h2>Latest Updates</h2>
          <p>
            <strong>2024.11.05 &mdash; </strong>The Providence Crime Syndication
            has graciously written a pre-Hunt round of puzzles, and will be
            releasing the{" "}
            <a href="https://mitmysteryheist.com/">MIT Mystery Heist</a> on
            Saturday, November 16th, 2024 at 12:00 PM Eastern Time. These
            puzzles are expected to be on the easier side and are a great
            opportunity to recruit your friends, hallmates, and labmates into
            the Hunt community. Learn more and solve at{" "}
            <a href="https://mitmysteryheist.com/">mitmysteryheist.com</a>.
          </p>
          <p>
            <strong>2024.10.02 &mdash; </strong>We&apos;re seeing a remarkable
            amount of enthusiasm and interest in the MIT Mystery Hunt hotel
            blocks (great!), and are working to ensure that we can continue
            offering discounted rooms to MIT Mystery Hunt attendees. However, we
            have been advised by the hotels that it may no longer be possible to
            add rooms at the originally posted rates. We will update this page
            as we learn of new pricing, but are prioritizing making rooms
            available as best as we can, even if that is at an increased price.
            Alternatively, the hotels are not (as of this writing) fully booked
            out, and so you may be able to book a room directly through the
            hotel at the regular rate.
          </p>
          <p>
            <strong>2024.10.01 &mdash; </strong>We&apos;ll update this page as
            we have more information to share. Major updates will also go to the{" "}
            <a href="https://mailman.mit.edu/mailman/listinfo/puzzle-hunters">
              puzzle-hunters mailing list
            </a>
            . Watch this space!
          </p>
        </section>
        <section id="faq">
          <h2>Frequently Asked Questions</h2>
          <details className="question">
            <summary>
              <h3>What is this?</h3>
            </summary>
            <div className="answer">
              <p>
                The MIT Mystery Hunt is a puzzlehunt competition that takes
                place on the MIT campus every year during Martin Luther King,
                Jr. Day weekend, a student tradition dating back more than 40
                years. Teams of intrepid adventurers solve puzzles all weekend
                long in a race to find a coin hidden on campus. To learn more
                about the tradition and see previous events, check out
                <a href="https://puzzles.mit.edu/">
                  the MIT Puzzle Club&apos;s website
                </a>
                .
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>When is MIT Mystery Hunt 2025?</h3>
            </summary>
            <div className="answer">
              <p>
                The Hunt will begin with a
                <strong>
                  live Kickoff event at 12:00 PM on Friday, January 17th
                </strong>
                . Kickoff will <strong>not</strong> be in Kresge Auditorium this
                year due to construction; the exact location(s) of kickoff will
                be published at a later date. Puzzles will be released at 1:00
                PM.
              </p>
              <p>
                Hunt Headquarters will remain open through the evening of
                Sunday, January 19th. There will be a
                <strong>
                  wrap-up presentation on Monday, January 20 at 12:00 PM
                </strong>
                . The location of wrap-up will be published at a later date.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>When is campus open? When is Hunt HQ open?</h3>
            </summary>
            <div className="answer">
              <p>
                <strong>
                  Campus is closed from 1:00 AM &ndash; 6:00 AM each day.
                </strong>
                Teams who have been assigned space on campus for their HQs must
                vacate during that time, but teams operating out of their living
                group are of course welcome to continue. During campus closure
                times you can continue solving puzzles, but non-students cannot
                be on campus.
              </p>
              <p>
                <strong>
                  Our Hunt HQ will also be closed during these overnight hours.
                </strong>
                We will continue to operate the Hunt website for solving,
                including answering hint requests, but solvers should not count
                on any events, live interactions, or physical puzzle pickups
                during this time.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>How do I sign up?</h3>
            </summary>
            <div className="answer">
              <p>
                Hunt registration for teams will open in{" "}
                <strong>early December</strong>. The official announcement will
                be sent to the
                <a href="https://mailman.mit.edu/mailman/listinfo/puzzle-hunters">
                  puzzle-hunters mailing list
                </a>
                . Check back for more details later.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>I&apos;m not part of a team. Can I still participate?</h3>
            </summary>
            <div className="answer">
              <p>
                Yes you can! You can always start your own team, but if
                you&apos;re looking to join an existing team we make an effort
                to match new hunters. When Hunt registration opens in early
                December, there will also be an opportunity for unattached
                hunters to register. We will do our best to help match you to a
                team. Check back later. If you are a student, please reach out
                to
                <a href="mailto:puzzle-club-exec@mit.edu">
                  puzzle-club-exec@mit.edu
                </a>
                for help getting matched to a team.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>Will there be any pre-Hunt puzzles this year?</h3>
            </summary>
            <div className="answer">
              <p>
                Yes there will!{" "}
                <strong>
                  The Providence Crime Syndication has graciously written a
                  pre-Hunt round of puzzles.
                </strong>
                The MIT Puzzle Club ran this as a live event for current
                students in October. (Students who would like more information
                about Puzzle Club events should join the Puzzle Club Discord
                server &mdash; which you can find via the{" "}
                <a href="https://discord.com/student-hubs">MIT Discord Hub</a>
                &mdash; for more information.)
              </p>
              <p>
                For the rest of the MIT Mystery Hunt community, The Providence
                Crime Syndication will be releasing the{" "}
                <a href="https://mitmysteryheist.com/">MIT Mystery Heist</a>{" "}
                online on November 16, 2024. You can find more information at{" "}
                <a href="https://mitmysteryheist.com/">mitmysteryheist.com</a>.
                These puzzles are expected to be on the easier side and are a
                great opportunity to recruit your friends, hallmates, and
                labmates into the Hunt community.
              </p>
              <p>
                The pre-Hunt round ties directly into the story of this
                year&apos;s MIT Mystery Hunt. However, none of the puzzle
                content or answers will be used in Hunt, and solving the
                pre-Hunt will not be necessary or helpful toward solving the MIT
                Mystery Hunt itself.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>Can I participate remotely? Should I?</h3>
            </summary>
            <div className="answer">
              <p>
                The MIT Mystery Hunt is at its core an on-campus event for the
                MIT community, and we believe our Hunt in particular will be
                best experienced in person. While we expect there to be many
                puzzles that are accessible to remote solvers, there will also
                be many physical puzzles, on-campus puzzles, interactions, and
                activities that can only be done in person. If you&apos;re on
                the fence about participating in this year&apos;s Hunt in
                person,
                <strong>we think this is a good year to show up</strong>!
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>Can my team participate remotely?</h3>
            </summary>
            <div className="answer">
              <p>
                Remote teams are welcome to sign up and participate in the MIT
                Mystery Hunt. However, there will be many puzzles and
                interactions that fully remote teams cannot complete, and
                because figuring out that a puzzle requires MIT knowledge or
                campus presence is part of the puzzle, they will not usually be
                labeled as such.{" "}
                <strong>
                  We expect that fully-remote teams and teams with fewer than 10
                  members on-campus will not be able to finish the Hunt.
                </strong>
              </p>
              <p>
                We are still excited to share the Hunt with the rest of the
                global puzzling community. After the live event ends,
                post-solvable versions of all puzzles will become available
                &mdash; with photographs, maps, data tables, and whatever else a
                fully remote team would need to complete the Hunt.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>Can teams with no students still win the Hunt?</h3>
            </summary>
            <div className="answer">
              <p>
                In order to win the MIT Mystery Hunt and write next year&apos;s,
                <strong>you must have at least 1 current MIT student</strong> on
                your team (although we recommend having more for logistical
                reasons). If your team has a concern about this requirement,
                please reach out to
                <a href="mailto:puzzle-club-exec@mit.edu">
                  puzzle-club-exec@mit.edu
                </a>
                and we can help facilitate communication with MIT students.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>
                Can my team use on-campus space as a headquarters during Hunt?
              </h3>
            </summary>
            <div className="answer">
              <p>
                If you would like to use classroom space for your HQ during
                Hunt, there will be a place to indicate this in your general
                registration which will open in early December. You can expect
                confirmation about your assigned space from us in early January.
                Please do not contact the Schedules Office directly for space
                during the MIT Mystery Hunt, as we&apos;ve already worked with
                them to reserve rooms.
              </p>
              <p>
                As always, reservable space on campus can get tight and more and
                more spaces have become department-only. If your team is able to
                hunt out of non-reservable spaces like living group lounges or
                restricted department spaces, that&apos;s even better!
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>
                How will campus access work for non-student team members this
                year?
              </h3>
            </summary>
            <div className="answer">
              <p>
                Campus access for guests has been a moving target since 2020,
                and MIT is actively rolling out a new system to replace Tim
                Tickets, so we&apos;re not yet exactly sure what procedures will
                be involved this year. We&apos;ll update as we learn more from
                MIT.
              </p>
              <p>
                We will also follow MIT&apos;s guidelines for COVID and
                respiratory virus prevention, and will have more detail on what
                these entail soon.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>Where can I stay to be near campus during Hunt?</h3>
            </summary>
            <div className="answer">
              <p>
                We have arranged for hotel blocks at three hotels near campus.
                See below for details about each option and instructions for
                reserving within each block.
              </p>
              <p>
                <strong>Note</strong>: We&apos;re seeing a remarkable amount of
                enthusiasm and interest in these hotel blocks (great!), and are
                working to ensure that we can continue offering discounted rooms
                to MIT Mystery Hunt attendees. However, we have been advised by
                the hotels that it may no longer be possible to add rooms at the
                originally posted rates. We will update this page as we learn of
                new pricing, but are prioritizing making rooms available as best
                as we can, even if that is at an increased price. Alternatively,
                the hotels are not (as of this writing) fully booked out, and so
                you may be able to book a room directly through the hotel at the
                regular rate.
              </p>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Hotel</th>
                    <th scope="col">Room block name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="https://www.marriott.com/events/start.mi?id=1710512158880&key=GRP">
                        Boston Marriott Cambridge
                      </a>
                    </td>
                    <td>
                      <code>MIT Mystery Hunt-Puzzle Club Room Block</code>
                    </td>
                    <td>$155 + 15.95% taxes per night</td>
                    <td>
                      <p>
                        Reserve by calling Marriott Central Reservations at
                        1-800-228-9290 no later than Friday, December 27th,
                        2024, to receive the discounted rate, or use
                        <a href="https://www.marriott.com/events/start.mi?id=1710512158880&key=GRP">
                          the link
                        </a>
                        .
                      </p>
                      <p>
                        Guests will be asked for a credit card when making the
                        reservations. They will also need to present one upon
                        check-in. If guests are Marriott Rewards members, please
                        have them put their account number on their reservation.
                      </p>
                      <p>
                        Marriott has been helpfully expanding the block as it
                        sells out, so if you don&apos;t see available rooms,
                        check back later.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>Le Meridien (See Details for links)</td>
                    <td>
                      <code>MIT Mystery Hunt Puzzle Club</code>
                    </td>
                    <td>
                      Either $129 or $179 per night + 15.95% taxes per night,
                      depending on availability. Additional $10 fee per person
                      per night above double occupancy
                    </td>
                    <td>
                      <p>Last Day to Book: Monday, December 16, 2024</p>
                      <p>
                        We have arranged two separate room rates at Le Meridien.
                        The
                        <a href="https://www.marriott.com/events/start.mi?id=1709830893589&key=GRP">
                          original rate
                        </a>{" "}
                        (at $129 per night) is likely sold out at this point,
                        but it is worth checking for last-minute availability.
                        If that rate is not available, you can book (at $179 per
                        night) at{" "}
                        <a href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1728312478960&key=GRP&guestreslink2=true">
                          this link
                        </a>
                        or call 1-800-543-4300 and ask for the MIT Mystery Hunt
                        Puzzle Club 2025 Group rate.
                      </p>
                      <p>
                        Le Meridien has limited capacity, so we expect that
                        these rooms may sell out and we do not expect further
                        availability to be added.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://www.hyatt.com/en-US/group-booking/BOSRC/G-M7H5">
                        Hyatt Regency Boston/Cambridge
                      </a>
                    </td>
                    <td></td>
                    <td>
                      <ul>
                        <li>Single/Double Occupancy: $179</li>
                        <li>Triple Occupancy: $199</li>
                        <li>Quad Occupancy: $219</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li>Start Date: Thursday, January 16, 2025</li>
                        <li>End Date: Sunday, January 19, 2025</li>
                        <li>Last Day to Book: Thursday, December 26, 2024</li>
                        <li>
                          Discounted overnight self-parking $30 per car per
                          night (regularly $45)
                        </li>
                        <li>
                          Complimentary standard wireless internet in guest
                          rooms
                        </li>
                        <li>
                          Waived $20 destination fee per room nightly plus
                          applicable taxes
                        </li>
                        <li>
                          The Arisia convention will be at the Hyatt Regency the
                          same weekend as the MIT Mystery Hunt. We expect
                          last-minute availability to be limited.
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>What&apos;s the recommended team size?</h3>
            </summary>
            <div className="answer">
              <p>
                There is no official team size recommendation, and this question
                is very difficult to answer as it depends entirely on your taste
                and style.
              </p>
              <p>
                For newer and smaller teams, you should know that the MIT
                Mystery Hunt is larger than other puzzle hunts that occur
                throughout the year. We&apos;re proud to have designed the Hunt
                to be exciting for teams of all sizes and experience levels, and
                will work with teams throughout the weekend to make sure they
                are having a fun and satisfying experience. However, very small
                teams should understand that they are unlikely to see all of the
                puzzles. Teams which complete the Hunt will likely have 30 or
                more solvers working intensely throughout the weekend. If
                you&apos;re debating inviting friends and hallmates to hunt with
                you, you probably should.
              </p>
              <p>
                For larger teams, you have a sense of your style and how you
                like to solve. We expect that teams will initially have around
                10 puzzles available simultaneously, increasing to around 20
                over the course of the Hunt. We also expect that the total
                number of puzzles will be in line with MIT Mystery Hunts of the
                last decade. We don&apos;t intend to release any additional
                information about the Hunt structure in advance, so we encourage
                you to use this information to decide how you want to approach
                team structure and recruiting for this year.
              </p>
              <p>
                If you have additional questions about team size, shoot us an
                email at
                <a href="mailto:info@mitmh2025.com">info@mitmh2025.com</a>.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>How can I support the MIT Mystery Hunt?</h3>
            </summary>
            <div className="answer">
              <p>
                If you are a current student, the best way to help the Hunt is
                to <strong>join the MIT Puzzle Club</strong> and recruit more
                friends to participate both in Puzzle Club and Hunt. (You can
                start by joining the Puzzle Club Discord server via the{" "}
                <a href="https://discord.com/student-hubs">MIT Discord Hub</a>
                ). There could be no MIT Mystery Hunt without the participation
                of the MIT community; growing that community ensures its future.
              </p>
              <p>
                For anyone else who is able to contribute, we would greatly
                appreciate your financial support. It does not cost anything to
                sign up and participate in the MIT Mystery Hunt. The organizers
                are not getting paid, but the event does still cost real money
                to produce and run&mdash;around $10 per person. Aside from a few
                valued corporate sponsors, the MIT Mystery Hunt and the MIT
                Puzzle Club are primarily funded by a large number of small
                donations. If you are in a position to do so, your
                <a href="https://giving.mit.edu/form?fundId=2720842">
                  tax-deductible donations designated to the MIT Puzzle Club
                </a>
                make this event possible.
              </p>
            </div>
          </details>

          <details className="question">
            <summary>
              <h3>I have another question!?</h3>
            </summary>
            <div className="answer">
              <p>
                That&apos;s not a question! But we&apos;re still excited to
                answer. If you have any additional questions about this
                year&apos;s event, please email
                <a href="mailto:info@mitmh2025.com">info@mitmh2025.com</a>.
              </p>
              <p>This FAQ will grow as the event gets closer.</p>
            </div>
          </details>
        </section>
      </div>
    </RegsiteWrapper>
  );
}
