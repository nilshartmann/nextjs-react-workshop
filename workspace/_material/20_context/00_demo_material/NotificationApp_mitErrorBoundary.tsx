import Container from "./Container.tsx";
import NotificationContextProvider, {
  useNotificationContext,
} from "./NotificationContext.tsx";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorMessage from "./AppErrorBoundary.tsx";

export default function NotificationApp() {
  return (
    <ErrorBoundary FallbackComponent={AppErrorMessage}>
      <NotificationContextProvider>
        <Container title={"App"}>
          <div className={"SameSizeFlex"}>
            <NotificationBar />
            <NotificationTrigger />
            <NotificationStatus />
          </div>
        </Container>
      </NotificationContextProvider>
    </ErrorBoundary>
  );
}

function NotificationBar() {
  // TODO: Lies die aktuelle Nachricht aus dem NotificationContext uns zeige sie unten an
  const { message } = useNotificationContext();

  return (
    <Container title={"NotificationBar"}>
      {message ? <h1>{message}</h1> : <h1>Keine Notification</h1>}
    </Container>
  );
}

function NotificationTrigger() {
  // TODO: Implementiere 'onClick'-Handler für die Button, so dass
  //       die Button die im Label beschriebenen Aktionen im Context
  //       durchführen
  const context = useNotificationContext();
  return (
    <Container title={"NotificationTrigger"}>
      <div className={"Flex"}>
        <button onClick={() => context.showNotification("not_found")}>
          Set 'not_found' notification
        </button>
        <button onClick={() => context.showNotification("invalid_user_id")}>
          Set 'invalid_user_id' notification
        </button>
        <button onClick={() => context.showNotification(null)}>
          Clear notification
        </button>
      </div>
      <div>
        <button onClick={() => context.setLanguage("de")}>
          Set Language to 'de'
        </button>
        <button onClick={() => context.setLanguage("en")}>
          Set Language to 'en'
        </button>
      </div>
    </Container>
  );
}

function NotificationStatus() {
  // TODO:
  //   - Prüfe ob zzt. eine Nachricht im Context gesetzt ist
  //     und zeige dann an, dass eine Nachricht gesetzt ist, bzw. das keine
  //     Nachricht gesetzt ist.
  //     Also nur die Info ob Nachricht (nicht) gesetzt ist, aber nicht die eigentliche Nachricht
  const hasNotification = useNotificationContext().messageId !== null;

  return (
    <Container title={"NotificationStatus"}>
      {hasNotification
        ? "Es ist eine Notification gesetzt"
        : "Es ist keine Notification gesetzt"}
    </Container>
  );
}
