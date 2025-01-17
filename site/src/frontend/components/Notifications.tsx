import React, {
  type ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { styled } from "styled-components";
import { SparkleBasic } from "../rounds/murder_in_mitropolis/Sparkle";
export type Notification = {
  key: string;
  icon: ReactNode;
  description: ReactNode;
};

type NotificationsProps = {
  maxNotifications: number;
  persistentNotifications?: Notification[];
};

export type NotificationsHandle = {
  addNotification: (notification: Notification) => void;
};

const NotificationWrapper = styled.div`
  position: fixed;
  top: 48px;
  right: 0;
  padding: 1rem;
  z-index: 50;
`;

const Notification = styled.div`
  width: 300px;
  min-height: 75px;
  background-color: var(--nav-bar-bg);
  border: 1px solid var(--gold-400);
  border-radius: 0.5em;
  padding: 0.5em;
  color: var(--white);
  font-size: 1rem;
  font-family: var(--body-font);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  position: relative;

  &.persistent {
    background-color: var(--purple-900);
  }

  &.item-enter {
    opacity: 0;
  }
  &.item-enter-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  &.item-exit {
    opacity: 1;
  }
  &.item-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`;

const NotificationIcon = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NotificationButton = styled.button`
  display: flex;
  width: 25px;
  background: none;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  justify-content: flex-end;
  font-weight: bold;
`;

const Notifications = forwardRef<NotificationsHandle, NotificationsProps>(
  ({ maxNotifications, persistentNotifications = [] }, ref) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useImperativeHandle(ref, () => ({
      addNotification: (notification: Notification) => {
        setNotifications((oldNotifications) => {
          if (oldNotifications.length >= maxNotifications) {
            return [...oldNotifications.slice(1), notification];
          } else {
            return [...oldNotifications, notification];
          }
        });
      },
    }));

    return (
      <NotificationWrapper>
        <TransitionGroup>
          {persistentNotifications.map((notification) => (
            <CSSTransition
              key={notification.key}
              timeout={500}
              classNames="item"
            >
              <Notification className="persistent">
                <SparkleBasic
                  pos={{ top: "-20px", left: "-10px" }}
                  startWidth="48px"
                  delay={0.11}
                  color="var(--white)"
                  opacity={1}
                />
                <SparkleBasic
                  pos={{ top: "-12px", left: "26px" }}
                  startWidth="24px"
                  delay={0.85}
                  color="var(--white)"
                  opacity={1}
                />
                <SparkleBasic
                  pos={{ top: "20px", left: "20px" }}
                  startWidth="16px"
                  delay={0.4}
                  color="var(--white)"
                  opacity={1}
                />
                <NotificationIcon>{notification.icon}</NotificationIcon>
                <NotificationDescription>
                  <span>{notification.description}</span>
                </NotificationDescription>
              </Notification>
            </CSSTransition>
          ))}
          {notifications.map((notification) => (
            <CSSTransition
              key={notification.key}
              timeout={500}
              classNames="item"
            >
              <Notification>
                <NotificationIcon>{notification.icon}</NotificationIcon>
                <NotificationDescription>
                  <span>{notification.description}</span>
                </NotificationDescription>
                <NotificationButton
                  onClick={(evt) => {
                    evt.preventDefault();
                    setNotifications((oldNotifications) =>
                      oldNotifications.filter(
                        (n) => n.key !== notification.key,
                      ),
                    );
                  }}
                >
                  X
                </NotificationButton>
              </Notification>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </NotificationWrapper>
    );
  },
);

Notifications.displayName = "Notifications";

export default Notifications;
