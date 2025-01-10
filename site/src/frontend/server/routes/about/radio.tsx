import { type Request } from "express";
import React from "react";
import { styled } from "styled-components";
import { wrapContentWithNavBar } from "../../../components/ContentWithNavBar";
import LinkedImage from "../../../components/LinkedImage";
import { Math, MFrac, MI, MN, MRow } from "../../../components/MathML";
import { AboutWrapper } from "./StyledAboutPage";
import image1 from "./assets/image1.svg";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";

const Pi = () => <MI>π</MI>;

const TwoPi = () => (
  <Math>
    <MN>2</MN>
    <Pi />
  </Math>
);

const SevenPiOver5 = () => (
  <Math>
    <MFrac>
      <MRow>
        <MN>7</MN>
        <Pi />
      </MRow>
      <MRow>
        <MN>5</MN>
      </MRow>
    </MFrac>
  </Math>
);

const SizedImage = styled(LinkedImage)<{ $width: number }>`
  width: ${({ $width }) => $width}px;
`;

const CenteredImage = styled(SizedImage)`
  display: block;
  margin: 1em auto;
`;

const FlexWrapper = styled.div`
  margin: 1em 0;
  display: flex;
  justify-content: space-around;
`;

const InnerFlexWrapper = styled.div`
  display: inline-flex;
  gap: 1em;
`;

const StyledLi = styled.li`
  margin-bottom: 1em;
`;

const BigCaps = styled.div`
  font-size: 36px;
  text-align: center;
`;

const BiggerCaps = styled.p`
  margin-top: 1em;
  font-size: 48px;
  text-align: center;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const IssuedDate = styled(CenteredDiv)`
  margin: 2em auto 0;
`;

const Logo = styled(CenteredImage)`
  margin-bottom: 3em;
`;

const Message = styled.div`
  margin: 1em;
  padding: 1em;
  background-color: var(--black);
  color: var(--white);
`;

const MessageInner = styled.div`
  border: 1px solid var(--white);
  padding: 1em;
`;

const StyledHr = styled.hr`
  color: var(--white);
  margin: 1em 0;
`;

export function radioHandler(req: Request) {
  const teamState = req.teamState;
  if (teamState === undefined) return undefined;

  const node = (
    <AboutWrapper>
      <>
        <IssuedDate>Issued January 2025</IssuedDate>
        <BigCaps>Instruction</BigCaps>
        <BigCaps>Manual</BigCaps>
        <BiggerCaps>RADIO</BiggerCaps>
        <Logo $width={200} src={image1} alt="D&M" />
        <p>
          We hope you enjoy this radio as a memento of the Carter-Finster
          engagement gala. We’ve included instructions to ensure that you get
          the most out of this cutting edge piece of technology, custom
          manufactured by D&M (Diodes & Microcircuits) as part of the
          celebration of the season.
        </p>
        <Message>
          <MessageInner>
            <CenteredDiv>
              This is an out-of-universe message from Death and Mayhem.
            </CenteredDiv>
            <StyledHr />
            <CenteredDiv>
              Please{" "}
              <strong>
                do not attempt to disassemble, hack, or re-flash your radio
              </strong>
              .
            </CenteredDiv>
            <br />
            You will need your radio throughout the weekend, we cannot easily
            repair it, and we have very few extras. We are so excited to talk
            about and show off the insides…at wrapup. In the meantime, anything
            you need to do to the radio should be obvious, and if you think
            something is wrong with your radio, please contact HQ and we will
            tell you if it is functioning as intended. Happy hunting!
          </MessageInner>
        </Message>
        <FlexWrapper>
          <InnerFlexWrapper>
            <SizedImage
              $width={261}
              src={image2}
              alt="A diagram of a radio, with lines pointing to the frequency dial, volume control, LED status indicator, frequency selector, and two buttons."
            />
            <SizedImage
              $width={224}
              src={image3}
              alt="A diagram of the back of a radio, with lines pointing to the USB power port, battery indicator, headphone jack, and band switch."
            />
          </InnerFlexWrapper>
        </FlexWrapper>
        <h2>Controls and Indicators</h2>
        <ol>
          <StyledLi>
            <strong>Volume and On/Off Switch</strong>: To turn your radio on,
            rotate the volume dial clockwise until you hear and feel a “click”.
            Continue rotating clockwise to increase the volume, or
            counterclockwise to decrease it.
            <br />
            <br />
            We are aware of an incompatibility with some radios and some USB
            chargers. If your radio does not turn on while plugged into USB
            power, unplug it, power it on, and then plug it back in.
            <br />
          </StyledLi>
          <StyledLi>
            <strong>Band Switch and Frequency Selector</strong>: Your radio is
            capable of receiving broadcasts over both traditional FM and the
            newly launched PM band (patent pending). To select between the two,
            use the toggle switch on the rear of your radio. The same frequency
            selector can be used for tuning in both the FM and PM bands. FM
            frequencies are labelled in solid black numbers; PM frequencies are
            labelled in outlined numbers.
            <br />
          </StyledLi>
          <StyledLi>
            <strong>USB Power and Battery Indicator</strong>: Your radio can be
            powered via a standard USB-C connection. It is additionally equipped
            with an onboard battery. We recommend keeping your radio plugged in
            when it is not otherwise in motion. In our testing, we found that
            the radio’s battery will last approximately 8-10 hours. However,
            your radio’s power consumption can vary based on the specific
            station that it is tuned to, so we recommend against relying too
            strictly on these estimates.
            <br />
            <br />
            The battery indicator on your radio will glow yellow when it is
            charging and green when it is fully charged. When its battery level
            is low, it will glow red.
            <br />
          </StyledLi>
          <StyledLi>
            <strong>Headphone Jack</strong>: Your radio’s included high-fidelity
            speaker should provide you with news and entertainment all weekend.
            However, if you are in a situation where outputting via speaker is
            inappropriate, the radio is also equipped with a standard 3.5mm
            headphone jack. Simply plugging in headphones is sufficient to
            change the preferred output device; no additional configuration is
            necessary. For your convenience, we have also included a pair of
            earbuds with your radio. We additionally expect this to work with
            classroom A/V systems, if you find the included speaker underpowered
            for your space.
            <br />
          </StyledLi>
        </ol>
        <h2>Stations</h2>
        <p>
          You should find your radio’s FM tuner to behave similarly to other FM
          receivers that you have encountered.
        </p>
        <p>
          Here is some additional information on currently broadcasting stations
          on the PM band. Make sure to check this page periodically, as there
          may be additional information available for newly discovered stations.
        </p>
        <h3>
          WDNM: <TwoPi />
        </h3>
        <p>
          Your radio should have arrived tuned to <TwoPi />, where WDNM will be
          coming to you live from the Gala Bar. WDNM is broadcasting important
          news updates all weekend, so we encourage you to make sure to listen
          in all weekend. If for some reason you find that you need to tune your
          radio away from
          <TwoPi />, an alternate virtual stream will be available.
        </p>
        <h3>
          Wireless Configuration: <SevenPiOver5 />
        </h3>
        <p>
          If your radio is outside of MITropolis airspace and struggling to
          receive PM broadcasts, you may need to make alternative wireless
          arrangements.
        </p>
        <p>
          <strong>Note:</strong> Your radio is not able to connect to wireless
          networks with a captive portal, such as hotel networks that require a
          login. In such an environment, we recommend tethering off of a phone.
        </p>
        <p>
          Tune your radio to <SevenPiOver5 />. Your radio will begin
          broadcasting its own wireless network with a name starting with
          “two-pi-radio-”. Use another device to connect to this network. If the
          device does not automatically open the wireless configuration page,
          use a web browser and navigate to 192.168.4.1 or to any website. The
          interface should look like this:
        </p>
        <CenteredImage
          $width={350}
          src={image4}
          alt="Two Pi Radio Wifi Configuration. Your radio can connect to MIT’s WiFi plus one additional network, which can be configured here. No secondary network currently configured. SSID: Scanning..."
        />
        <p>
          Once successfully configured, you may tune your radio back to its
          original station.
        </p>
        <h2>Solving Issues</h2>
        <h3>My radio won’t turn on</h3>
        <p>
          Some radios have a known issue where they will not turn on while
          connected to USB power. Try disconnecting USB power, turning the radio
          on, and then re-connecting USB power. If this still does not work,
          please bring the radio by the Gala Bar.
        </p>
        <h3>My radio is not functioning properly</h3>
        <p>
          As always, the best first step is to try turning the radio off (and
          leaving it off for 3-5 seconds) then turning it back on. If that
          doesn’t work, make sure that you are able to receive the <TwoPi />{" "}
          stream to confirm your radio is connected to the wireless. If you are
          unable to connect or that does not resolve some other issue, please
          contact HQ and we will confirm if you need to bring the radio to the
          Gala Bar for debugging.
        </p>
        <h2>Additional Instructions</h2>
        <p>
          Because this is a cutting edge piece of technology, this page will be
          updated over the course of the weekend should we implement new
          features.
        </p>
      </>
    </AboutWrapper>
  );

  return wrapContentWithNavBar(
    {
      node,
      title: "Radio Instruction Manual",
    },
    teamState,
  );
}
