import { createContext, ReactNode, useContext, useState } from "react";
import { invariant } from "@epic-web/invariant";

type Lang = "en" | "de";
type MessageId = "not_found" | "invalid_user_id";
type Messages = Record<MessageId, string>;

const messages_de: Messages = {
  not_found: "Nicht gefunden",
  invalid_user_id: "User-Id ungültig",
};

const messages_en: Messages = {
  not_found: "Not found",
  invalid_user_id: "User is invalid",
};

const messages: Record<Lang, Messages> = {
  de: messages_de,
  en: messages_en,
};

// Implementiere einen Kontext, der eine globale Message enthält
//   (Fachliches Beispiel wäre eine globale Notification oder "Toast"-Komponente)
//
// - Man kann nur Messages ausgeben, die in 'MessageId' definiert sind
// - Die Messages sollen "übersetzt" ausgegeben werden können, je nachdem was für eine Sprache ausgewählt sind
// - Dazu musst Du auch die ausgewählte Sprache im Kontext ablegen (Sprachen stehen im Typ 'Lang')
// - Man soll außerdem die gesetzte Nachricht löschen können, in dem 'null' gesetzt wird
// - Du brauchst in deinem Context also folgende Informationen
//   - welche Message gesetzt ist oder null, falls keine Nachricht gesetzt ist (default soll 'null' sein)
//   - welche Sprache ausgewählt ist (default soll 'en' sein)
//   - Zwei Methoden:
//     - showNotification, mit der die Anwendung festlegen kann, welche Nachricht gesetzt werden soll (oder null)
//     - setLanguage: mit der die Anwenudng die Sprache der Nachricht festlegen kann
//
// SCHRITTE:
//  1. Definiere einen TypeScript-Typen für den Kontext (INotificationContext)
//  2. Erzeuge den React Context mit 'createContext'. Der Default-Context soll null sein
//  2. Implementieren die Provider-Klasse unten
//  3. Implementiere einen Custom Hook zum Zugriff auf den Kontext (useNotificationContext)
//      Prüfe im Custom Hook dass der Context auch gesetzt ist (useContext liefert wirkliche einen Context zurück)
//        Falls useContext KEINEN Context zurückliefert => Error werfen ("Invalid usage of Context")
//  4. Verwende den Context in 'NotificationApp.tsx' (weitere TODOs siehe dort)

// Beschreibe hier den TypeScript-Typen für unseren Notification Kontext
type INotificationContext = {
  messageId: MessageId | null;
  message: string | null;
  lang: Lang;

  showNotification(messageId: MessageId | null): void;
  setLanguage(lang: Lang): void;
};

//
const NotificationContext = createContext<INotificationContext | null>(null);

type NotificationContextProviderProps = {
  children?: ReactNode;
};
export default function NotificationContextProvider({
  children,
}: NotificationContextProviderProps) {
  // Implementiere hier die Context-Logik
  //  - welche Informationen aus dem NotificationContext benötigst Du hier im State? Wieviele States verwendest Du?
  //  - Denk' daran, dass man sowohl die Message als auch die Sprache unabhängig voneinander ändern kann
  //  - Verwende NotificationContext.Provider um das Context-Objekt zu setzen (value-Property)
  //  - Als Kind-Element von NotificationContext.Provider musst Du das 'children' Property übergeben, das
  //    an diese (NotificationContextProvider) Komponente übergeben wurde

  const [messageId, setMessageId] = useState<MessageId | null>(null);
  const [language, setLanguage] = useState<Lang>("en");

  const showNotification = (newMessageId: MessageId | null) => {
    setMessageId(newMessageId);
  };

  const message = messageId ? messages[language][messageId] : null;

  return (
    <NotificationContext.Provider
      value={{
        messageId,
        message,
        lang: language,
        showNotification,
        setLanguage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext(): INotificationContext {
  // Implementiere diesen Custom Hook, so dass dieser in jedem Fall einen INotificationContext
  // zurückliefert (oder throw new Error("..."), falls kein Context gesetzt ist)
  const ctx = useContext(NotificationContext);

  invariant(
    ctx !== null,
    "No NotificationContext found. Please add NotificationContextProvider.",
  );

  return ctx;
}
