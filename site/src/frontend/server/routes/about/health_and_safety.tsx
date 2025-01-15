import { type Request } from "express";
import React from "react";
import { wrapContentWithNavBar } from "../../../components/ContentWithNavBar";
import {
  PageWrapper,
  PageHeader,
  PageTitle,
  PageMain,
} from "../../../components/PageLayout";

export function healthAndSafetyHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <PageWrapper>
      <>
        <PageHeader>
          <PageTitle>Health and Safety Guidelines</PageTitle>
        </PageHeader>
        <PageMain>
          <h2>Use common sense</h2>
          <ul>
            <li>
              <strong>This is a puzzle-solving competition</strong>, not a
              mountain-climbing expedition. There is no reason for anyone to put
              themselves at risk of being harmed, arrested, or held liable for
              any property damage. Our actions also reflect on the Mystery Hunt
              as a whole, so let’s stay safe and responsible both for our own
              sakes and for the sake of everyone who loves the Mystery Hunt and
              cares about its future.
            </li>
            <li>
              <strong>Follow our instructions.</strong> During hunt, we will
              communicate any important health and safety information on the
              hunt website, by email, by phone, and in person if needed.
            </li>
            <li>
              One volunteer on each team should be designated as the{" "}
              <strong>“Health & Safety Marshal.”</strong> That person should be
              familiar with the information in these guidelines and ready to
              respond if a problem arises while your team is hunting.
            </li>
            <li>
              <strong>
                If you think you are about to do something illegal, unsafe,
                against MIT policy or otherwise ill-advised, CALL HUNT HQ FIRST.
              </strong>
            </li>
          </ul>
          <h2>Important contact information</h2>
          <ul>
            <li>
              <strong>MIT POLICE: 617-253-1212</strong> (or 100 from a campus
              phone). The MIT Police should be contacted in all emergencies,
              whether they are of a criminal, medical, or safety nature, or to
              report an encounter with a suspicious or dangerous person who is
              not participating in the hunt. The MIT Police will dispatch the
              appropriate resources, which in some cases might include the
              student-run MIT-EMS, who will have an ambulance on call.
            </li>
            <li>
              <strong>Hunt HQ Phone: 617-324-7732.</strong> Call during hunt if
              you encounter a “real-life situation” and you do not know what to
              do (minor medical issue, lost team member, encounter with police,
              damage to MIT property, etc.).
            </li>
            <li>
              <strong>
                Hunt Organizers Email:{" "}
                <a href="info@mitmh2025.com" target="_blank" rel="noreferrer">
                  info@mitmh2025.com
                </a>
                .
              </strong>{" "}
              All incidents should be reported by e-mail after the immediate
              emergency or threat has been managed.
            </li>
          </ul>
          <h2>Alerts</h2>
          <ul>
            <li>
              <strong>MIT Alert System:</strong> Provides real-time alerts for
              emergencies on campus. We will add at least one contact per team
              just for Hunt weekend (via the Health & Safety Quiz); to subscribe
              permanently, visit{" "}
              <a
                href="http://em2.mit.edu/mitalert/"
                target="_blank"
                rel="noreferrer"
              >
                http://em2.mit.edu/mitalert/
              </a>
              .
            </li>
            <li>
              <strong>Fire Alarms:</strong> If an alarm sounds, do not continue
              working. All team members must immediately exit the building
              through the nearest marked exit, and wait for further
              instructions.
            </li>
          </ul>
          <h2>Medical care</h2>
          <ul>
            <li>
              <strong>Urgent Care:</strong>
              <ul>
                <li>
                  <strong>MIT affiliates</strong> can use MIT Medical’s Urgent
                  Care in building E23 for non-emergency treatment, 7am-11pm.
                  Overnight, call MIT Medical at 617-253-4481 to speak with a
                  nurse, who can schedule a next-day appointment.{" "}
                </li>
                <li>
                  <strong>Non-MIT-affiliates</strong> should not use MIT’s
                  Urgent Care service. Instead, use area hospitals for urgent
                  medical needs. Massachusetts General Hospital, Cambridge
                  Hospital, and Mount Auburn Hospital are the closest.
                </li>
              </ul>
            </li>
            <li>
              <strong>First Aid:</strong> Hunt HQ will provide a kit to each
              team for treating minor issues.
            </li>
          </ul>
          <h2>Know where you are</h2>
          <ul>
            <li>
              <strong>MIT is a real university</strong>, and Mystery Hunt is not
              the only thing happening. Try not to disturb researchers, staff,
              and other activities that might be occurring on campus. Many of us
              are guests on campus, and we want to be allowed to come back.
            </li>
            <li>
              <strong>
                Don’t go anywhere or do anything illegal or unsafe.
              </strong>{" "}
              Mystery Hunt takes place in specified rooms and campus locations
              accessible to the MIT community at large. Don’t attempt to enter
              other spaces, except locations where events are scheduled or that
              Hunt personnel explicitly provide access to. Don’t force open
              locked doors or set off emergency alarms.
            </li>
            <li>
              <strong>
                Don’t carry any weapon, or anything that looks like a weapon, on
                campus.
              </strong>
            </li>
            <li>
              <strong>Be careful with MIT property</strong>, especially if your
              team is using an MIT room as its base. Damage to property will
              reflect poorly on the Mystery Hunt in general and will compromise
              your team’s ability to use MIT rooms in the future.
            </li>
            <li>
              <strong>Team members may not know MIT’s campus well.</strong>{" "}
              Before sending team members on an excursion, you should ensure you
              can stay in touch with them (and vice versa). If needed, provide
              team members with maps.{" "}
              <a href="http://whereis.mit.edu" target="_blank" rel="noreferrer">
                Whereis
              </a>{" "}
              and the{" "}
              <a href="http://m.mit.edu" target="_blank" rel="noreferrer">
                MIT mobile website
              </a>{" "}
              both have campus maps.
            </li>
            <li>
              If you think a team member is lost, call them directly. If that
              fails, call Hunt HQ, and if we cannot help, contact MIT Police.
            </li>
          </ul>
          <h2>Stay healthy</h2>
          <ul>
            <li>
              Ask if any of your team members have{" "}
              <strong>allergies or other health conditions</strong> that might
              require attention, and take appropriate precautions.
            </li>
            <li>
              Make sure every team member has a{" "}
              <strong>plan for getting sleep</strong>. “Work until burnout” is
              not a winning strategy. Getting sleep is important—Mystery Hunt is
              a marathon, not a sprint.
              <ul>
                <li>
                  <strong>
                    MIT rules do not allow sleeping in classrooms, lounges,
                    hallways, etc.
                  </strong>{" "}
                  Make appropriate arrangements so that team members can sleep
                  in dorms, hotels or nearby residences. Dorm residents hosting
                  hunters should adhere to the guest policies of their residence
                  halls.
                </li>
                <li>
                  <strong>
                    MIT does not allow visitors to access campus between 1 AM
                    and 6 AM.
                  </strong>{" "}
                  Non-students may not be on campus between these hours, and
                  everyone (including students) must vacate your assigned team
                  HQs. Our HQ will be closed and there will be no interactions
                  or physical puzzle pickups during this time.
                </li>
              </ul>
            </li>
            <li>
              Be sure team members <strong>stay hydrated</strong> and have{" "}
              <strong>nutritious food</strong> to eat over the course of the
              weekend. Not just Oreos and Mountain Dew. There are food options
              available nearby in Kendall Square, Central Square, and the MIT
              Student Center.
            </li>
            <li>
              <strong>No alcohol or drugs on campus.</strong> Possession or
              consumption of alcohol or drugs in classrooms or in public MIT
              campus spaces (except pubs) is strictly prohibited. This policy
              applies even if everyone on your team is of legal drinking age.
            </li>
            <li>
              Everyone participating in the MIT Mystery Hunt must wear their
              identifiable nametag and lanyard visibly at all times.
            </li>
            <li>
              Everyone participating in the MIT Mystery Hunt on campus must fill
              out a{" "}
              <a
                href="https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=737d4a84-e41a-4283-a180-4cf5255dce30&env=na2&acct=a76475db-2ab3-4a5f-b7bd-1ba6a5dd7f4e&v=2"
                target="_blank"
                rel="noreferrer"
              >
                photo release waiver
              </a>
              .
            </li>
          </ul>
          <h2>Minors</h2>
          <ul>
            <li>
              A minor is anyone under 18 years of age who is not a current MIT
              student.
            </li>
            <li>
              Minors may attend or participate in Mystery Hunt from on-campus
              locations between the hours of 6:00 AM and 1:00 AM.
            </li>
            <li>
              <strong>
                Minors must be accompanied by a parent/guardian at all times.
              </strong>
            </li>
            <li>
              Minors and their accompanying parent/guardian must have an
              identifiable colored dot on their nametag.
            </li>
            <li>
              Minors must travel to and from campus with their parent/guardian.
            </li>
            <li>
              If you need to interact with an unsupervised minor, have another
              adult present and conduct those interactions in a public
              environment where you can be observed.
            </li>
            <li>
              The full{" "}
              <a
                href="https://studentlife.mit.edu/sites/default/files/Documents/Minors%20-%20Code%20of%20Conduct.pdf"
                target="_blank"
                rel="noreferrer"
              >
                MIT Code of Conduct for Working with Minors
              </a>{" "}
              should be reviewed by every team captain.
            </li>
            <li>
              A parent/guardian of every minor on campus must fill out the{" "}
              <a
                href="https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=0dc9fd29-4121-4b62-a65c-fc60258aa1f1&env=na2&acct=a76475db-2ab3-4a5f-b7bd-1ba6a5dd7f4e&v=2"
                target="_blank"
                rel="noreferrer"
              >
                general liability waiver and photo release
              </a>
              .
            </li>
          </ul>
          <h2>Hunt Code of Conduct: Maintain a harassment-free environment</h2>
          <p>
            The MIT Mystery Hunt is dedicated to providing a harassment-free
            experience for everyone, regardless of gender, gender identity and
            expression, sexual orientation, disability, physical appearance,
            body size, age, race, or religion. We do not tolerate harassment of
            participants in any form. Participants asked to stop any harassing
            behavior are expected to comply immediately.
          </p>
          <p>
            MIT policies expressly prohibit harassment, including sexual
            harassment, sexual misconduct, gender-based harassment and stalking.
            All teams and participants must abide by MIT’s{" "}
            <a
              href="https://policies.mit.edu/policies-procedures/90-relations-and-responsibilities-within-mit-community/95-harassment"
              target="_blank"
              rel="noreferrer"
            >
              Harassment Policy
            </a>
            . Hunt participants violating this policy may be expelled from
            Mystery Hunt at the organizers’ discretion.
          </p>
          <p>
            If you would like to report harassment, please remove yourself from
            the uncomfortable situation and contact Hunt HQ by phone or email.
            Alternatively, participants can report to MIT directly through{" "}
            <a
              href="https://idhr.mit.edu/reporting-options"
              target="_blank"
              rel="noreferrer"
            >
              https://idhr.mit.edu/reporting-options
            </a>
            .
          </p>
          <p>
            Team captains should make sure this policy is understood by all team
            members and should actively discourage harassment within and among
            teams.
          </p>
        </PageMain>
      </>
    </PageWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "Health and Safety",
    },
    teamState,
  );
}
