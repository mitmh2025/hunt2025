import React, {
  type ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { styled } from "styled-components";
export type Notification = {
  key: string;
  icon: ReactNode;
  description: ReactNode;
};

type NotificationsProps = {
  maxNotifications: number;
};

export type NotificationsHandle = {
  addNotification: (notification: Notification) => void;
};

const NotificationWrapper = styled.div`
  position: fixed;
  top: 48px;
  right: 0;
  padding: 1rem;
  z-index: 1000;
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
  ({ maxNotifications }, ref) => {
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
