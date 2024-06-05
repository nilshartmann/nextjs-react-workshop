import Container from "./Container.tsx";

export default function NotificationApp() {
  // TODO:
  //  - Füge deinen NotificationContextProvider als Top-Level-Komponente ein
  //  - Vervollständige dann die NotificationBar, -Trigger und -Status-Komponente
  return (
    <Container title={"App"}>
      <div className={"SameSizeFlex"}>
        <NotificationBar />
        <NotificationTrigger />
        <NotificationStatus />
      </div>
    </Container>
  );
}

function NotificationBar() {
  // TODO: Lies die aktuelle Nachricht aus dem NotificationContext uns zeige sie unten an
  const message = "";

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
  return (
    <Container title={"NotificationTrigger"}>
      <div className={"Flex"}>
        <button>Set 'not_found' notification</button>
        <button>Set 'invalid_user_id' notification</button>
        <button>Clear notification</button>
      </div>
      <div>
        <button>Set Language to 'de'</button>
        <button>Set Language to 'en'</button>
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
  const hasNotification = false;

  return (
    <Container title={"NotificationStatus"}>
      {hasNotification
        ? "Es ist eine Notification gesetzt"
        : "Es ist keine Notification gesetzt"}
    </Container>
  );
}
