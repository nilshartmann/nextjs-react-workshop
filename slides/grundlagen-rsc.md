### Grundlagen und Wiederholung

---

### Single-Page-Anwendungen mit React.js

<!-- .slide: class="with-fragments" -->

- React war (ist?) eine Bibliothek zur Entwicklung rein clientseitigen Webanwendungen (Single-Page-Anwendungen)
- Single-Page-Anwendungen werden in JavaScript geschrieben und laufen vollständig **im Browser**

  - Die UI-Logik wird also ausschliesslich im Client umgesetzt und ausgeführt

- Die Kommunikation mit dem Backend erfolgt in der Regel über **HTTP APIs** (z.B. REST oder GraphQL)

---

### Serverseitiges Rendern mit React (SSR)

<!-- .slide: class="with-fragments" -->

- SSR bedeutet das beim **ersten Zugriff** auf eure Anwendung die abgefragte Seite auf dem Server gerendert und fertig **als HTML** zum Browser geschickt wird.
- Der Browser kann die Seite also **sofort anzeigen**
- Dann lädt der Browser aber auch den vollständigen JavaScript-Code euer Anwendung
- Alle weiteren Interaktionen erfolgen dann über JavaScript (wie bei SPAs üblich)

---

### React und Next.js

<!-- .slide: class="with-fragments" -->

- Seit ca. einem Jahr (Anfang 2023) empfiehlt React nun aber ein "Fullstack-Framework"
- <img src="/slides/images/fullstack-framework.png" style="width:100%">

---

### Fullstack Anwendungen

<!-- .slide: class="with-fragments" -->

- Bei Fullstack-Anwendungen werden Teile der UI-Logik in den Server geschoben
- Für React-basierte Ansätze bedeutet das:
  - Ihr schreibt weiterhin "eine" Anwendung (mit React/Next.js) in JavaScript
  - Aber: Teile eurer Komponenten werden jetzt **zur Laufzeit** auf dem **Server** gerendert
  - Die Anwendung läuft also nicht mehr vollständig im Browser, man braucht einen JS-fähigen Server
- Warum sollte man das tun? 🤔
- Warum empfiehlt React diesen Ansatz? 🤔
- Inwiefern ist eine Fullstack-Anwendung besser als Single-Page-Anwendung? 🤔
- Gibt es Nachteile? 🤔

---

## Beispiel: Blog-Anwendung

---

## "Fullstack Architektur-Vision"

<!-- .slide: class="with-fragments" -->

- **React Server Components (RSC)**

  - Komponenten, die auf dem Server oder zur Buildzeit gerendert werden können
  - Data Fetching "integriert"

- **Suspense**

  - Platzhalter für "langsame" Teile einer Seite
  - Mit Streaming können diese Teile einer Seite "nachgeliefert" werden, sobald sie gerendert sind

- [https://react.dev/learn/start-a-new-react-project#which-features-make-up-the-react-teams-full-stack-architecture-vision](https://react.dev/learn/start-a-new-react-project#which-features-make-up-the-react-teams-full-stack-architecture-vision)

---

## Zero-Bundle-Size

# React Server Components

---

### Arten von Komponenten

<!-- .slide: class="with-fragments" -->

- **Client-Komponenten**

- Werden auf dem **Client** gerendert
- oder auf dem **Server** 🙄

- "Klassische" und ursprüngliche Komponente, mit denen man React-Anwendungen baut:
  - JavaScript-Code wird vollständig zum Client gesendet
  - Der JavaScript-Code wird auf dem Client ausgeführt
  - Die Komponenten können interaktiv sein
    - Zum Beispiel auf Button-Klick oder Eingaben reagieren

---

### Arten von Komponenten

<!-- .slide: class="with-fragments" -->

- **Neu: Server-Komponenten**

- werden auf dem **Server** gerendert
- oder im **Build** 🙄

- Der Server schickt dafür lediglich _eine Repräsentation der UI_, aber _keinen JavaScript-Code_
  - Die "Repräsentation" wird von React im Client in die Anwendung eingebaut
  - React (bzw. Next.js) muss also im Client laufen
  - **Server Komponenten** bedeutet _nicht_, das man gar kein JavaScript im Browser hat.
- Komponenten werden **nicht** im **Client** ausgeführt
  - ...und können folglich nicht interaktiv sein (nur ohne JS)

---

<!-- .slide: class="with-fragments" -->

### Arten von Komponenten

- Die Komponenten gemischt werden:
- Server-Komponenten können Client-Komponenten einbinden
  - (umgekehrt geht es nicht)
- Dann wird alles bis zur ersten Client-Komponente gerendert und an den Client gesendet

- <!-- .element: class="demo" -->Eine "Message"-Komponente
- <!-- .element: class="demo" -->Eine Server-Komponente (Route), die die Message-Komponente rendert
- <!-- .element: class="demo" -->Eine zweite Route mit einer Client-Komponente, die ebenfalls die Message-Komponente rendert

---

## Next.js

- Um die "modernen" Fullstack-Features von React nutzen zu können, braucht man ein entsprechendes Framework
- https://nextjs.org/
- Features:
  - Unterstützung für React Server Components
  - React Client Komponenten
- Proprietäre Features:
  - SSR
  - Static Rendering
  - Datei-basiertes Routing
  - Caching und Preloading
  - API Routen

---

### Der Next.js Router

- [App-Router](https://nextjs.org/docs/app/building-your-application/routing): neuer Router (seit Version 13.4), der RSC unterstützt
  - (der "alte" `pages`-Router unterstützt keine RSC)
- File-system-basierter Router, der Code eurer Anwendung liegt unterhalb des Verzeichnisses `app`
- Unterhalb von `app` ist ein Verzeichnis eine **Route**, wenn darin eine `page.tsx`-Datei liegt
  - Dann ist dieses Verzeichnis vom Browser aufrufbar (`app/user/profile/page.tsx` -> Pfad im Browser: `/user/profile`)
  - `page.tsx` vergleichbar mit `index.html` in klassischem Web-Server
  - Verzeichnisse, die _keine_ `page.tsx`-Datei haben, tauchen zwar in der URL auf, können aber nicht aufgerufen werden
- Eine **Routen-Datei** muss per `default export` eine React-Komponente exportieren.
- Diese Komponente wird dargestellt, wenn die Route vom Browser angefordert wird
- ```tsx
  // /app/page.tsx
  export default function LandingPage() {
    return <h1>Hello World!</h1>;
  }

  // /app/recipes/page.tsx
  export default function RecipeListPage() {
    return <h1>Tasteful recipes 😋</h1>;
  }
  ```

---

### Demo: Next.js Router

- <!-- .element: class="demo" --> Landing-Page
- <!-- .element: class="demo" --> Recipes Page
- <!-- .element: class="demo" --> Layout

---

### Der Next.js Router

- In einem Route-Verzeichnis kann es weitere Dateien geben, die einen festgelegten Namen haben und jeweils per `default export` eine React-Komponente zurückliefern:
- `layout.tsx`: Definiert die Layout-Komponente.
  - Damit kann über mehrere Routen ein einheitliches Layout festgelegt werden, denn wenn eine Seite gerendert wird, werden alle Layout-Komponenten aus den Pfaden darüber verwendet. So kann eine Hierarchie von Layouts gebaut werden.
- `loading.tsx`: Loading-Spinner o.ä., der dargestellt wird, bis die Seite gerendert werden kann (dazu später mehr)
- `error.tsx`: Eine Komponente, die als Error Boundary fungiert und gerendert wird, wenn beim Rendern der `page` ein Fehler aufgetreten ist
- `not-found.tsx`: Kann verwendet werden, um einen Fehler darzustellen, wenn eine Seite `notFound` zurückliefert

---

### Der Next.js Router: Layouts

- Jede Route kann eine Layout-Komponente haben
- Dieser Komponente wird die darzustellende Seite als `children`-Property übergeben
- ```tsx
  type MainLayoutProps = { children: React.ReactNode };

  export default function MainLayout({ children }: MainLayoutProps) {
    return <main>{children}</main>;
  }
  ```

- Layout-Komponenten können verschachtelt sein
- Wenn eine Route keine Layout-Komponente hat, wird im Baum oberhalb nach der nächstgelegenen Layout-Komponente gesucht
- Die Layout-Komponente für die Root-Route ist _pflicht_. Hier muss eine ganze HTML-Seite beschrieben werden
- ```tsx
  // /app/layout.tsx
  export default function Layout({children}: {children: ReactNode}) {
    return <html>
       <head><title>Enterprise Blogging</title></head>
       <body>
         <header>Full-stack, full blog</header>
         <main>{children}</main>
       </body>
      <html>
  }
  ```

---

### Navigieren

- Zum Rendern von Links bringt Next.js eine eigene `Link`-Komponente mit
  - Mit einem entsprechenden Plug-in für TypeScript soll die sogar typsicher sein, so dass man keine Routen-Angaben hinschreiben kann, die es gar nicht gibt
    - (hat bei mir beim letzten Versuch nur eingeschränkt funktioniert)
- Verwendung ähnlich wie auch vom React Router (und `a`-Element) gewohnt:

- ```tsx
  import Link from "next/link";

  function BlogPostLink({ postId }) {
    return <Link href={`/posts/${postId}`}>Read...</Link>;
  }
  ```

---

### Übung: Klonen des Repositories und Vorbereitung

- Bitte klonen: https://github.com/nilshartmann/nextjs-react-workshop
- In der [README.md-Datei](https://github.com/nilshartmann/nextjs-react-workshop/blob/main/README.md) findet ihr Hinweise zur Installation des Workspaces
- Bitte erstmal nur die Schritte 1.x ("Backend") und 2.x (Blog-Example-Workspace) durchführen
- **Arbeitsverzeichnis**: Wir arbeiten zunächst ausschliesslich im Verzeichnis `blog-example/blog-workspace`
- ⚠️ Bitte **nur** das `blog-example/blog-workspace`-Verzeichnis in der IDE oder im Editor öffnen

---

### Der Workspace

- `blog-workspace`: Next.js-Anwendung, in der wir Übungen machen
- `blog-schritte`: Hier findet ihr die Lösungen zu den Übungen
- `blog-app`: die fertige Anwendung
- ⚠️ Die Ordnerstruktur in `app` folgt nicht Best-Practices!
  - Die Struktur ist "optimiert" für unseren Workshop mit Übungen
  - Faustregel: alles was unter `material` ist, wäre in einer echten Anwendungen eher direkt unter `app/posts/...`
- ⚠️ Wir verwenden eine Vorab-Version von [Next.js 15](https://nextjs.org/blog/next-15-rc), die eine Vorab-Version von [React 19](https://react.dev/blog/2024/04/25/react-19) enthält
  - Die meisten Dinge, die wir uns anschauen, sind aber auch schon mit Next.js 14 und React 18 gültig
  - Features, die neu in Next.js 15 / React 19 sind, werde ich explizit erwähnen

---

### Warnung: Next.js Caching

- Achtung! Next.js hat sehr aggressives Caching eingebaut
- Wenn ihr "komisches" Verhalten feststellt, könnt ihr probieren:
  - Im Browser neuen Tab öffnen, oder in den Dev Tools Caching ausschalten oder Inkognito Modus verwenden
  - "Hard Refresh" im Browser machen
  - Verzeichnis `workspace/.next` löschen und Next.js neu starten

---

### Übung: Getting started!

<!-- .slide: class="small" -->

1. **blog-example/blog-workspace** in IntelliJ öffnen
1. Installieren: **backend**-Verzeichnis: `npm install` und `npm run dev`
1. Installieren **blog-example/blog-workspace**-Verzeichnis: `npm install --force` und `npm run dev`

1. Baue die "Landing Page" für die Root-Route (`/`) im `app`-Verzeichnis

   - Die Seite muss nicht hübsch sein
   - heute gilt: wir machen Bauhaus-Style, "form follows function" 😉
   - Die Komponente soll einen Link auf `/posts` rendern

1. Lege die Komponente für die Route `/posts` an

   - Es reicht, wenn diese Komponente erstmal nur "Hello World" ausgibt.
   - In welches Verzeichnis muss die `page.tsx`-Datei für diese Route?

1. Wenn deine neuen Routen funktionieren:

   - Füge ein `console.log`-Statement in deine Komponenten hinzu, das beim Rendern die aktuelle Uhrzeit ausgibt
   - wo und wann wird das Log-Statement ausgegeben?

1. Kannst Du eine `layout`-Komponente bauen, die für Routen innerhalb `/posts` gilt, aber nicht für die Root-Route (`/`)

   - Du kannst dir selbst ein einfaches Layout ausdenken, oder diese Komponente verwenden: `BlogPageLayout`

   - Mögliche Lösung findest Du in `schritte/10_routen_und_links`

1. Wenn du fertig bist, bitte Hand in Zooom heben ✋

---

## Data Fetching

---

## Data Fetching

- Komponente, die Daten benötigen, können diese direkt _in der Komponente_ laden
- _Kann_ Latenz sparen und bessere Performance bringen

- "No Client-Server Waterfalls"

- Server Components können die Server-Infrastruktur nutzen (DB, Filesystem)

- 👉 Server-Komponenten können dazu _asynchron_ sein

- 🤔 Promise API und async/await-API in JavaScript?

---

## Data Fetching

### Demo: Eine asynchrone Server-Komponente

- React Server Componentens können asynchron sein!

- <!-- .element: class="demo" -->posts/page.tsx anlegen

- <!-- .element: class="demo" -->DB-Zugriff mit `fetchPosts`

---

### Asynchrone React Server Components

- React Server Components (RSC) werden **nicht auf dem Client** ausgeführt!
- Ihr könnt dort keine Event Handler etc. verwenden. Auch Hooks (z.B. `useState`) gehen nicht.
- Dafür könnt ihr eine RSC als `async function` implementieren
- Innerhalb der RSC könnt ihr dann mit Promises arbeiten und mit `await` auf diese warten
- Ihr könnt z.B. `fetch`-Aufrufe machen, Datenbank-Zugriffe oder die Node.JS API verwenden, um Dateien von der Festplatte zu lesen
- ```tsx
  export default async function PostsList() {
    // Dieser Fetch-Call wird im Next.js-Backend (!) ausgeführt!
    const response = await fetch("http://localhost:7000/posts");
    const recipes = await response.json();

    // ...
    return <PostList recipes={recipes} />;
  }
  ```

---

### Überbrücken der Wartezeit

- Was passiert, wenn wir die `PostList` (`/posts`) aufrufen und der `fetch`-Call "lange" dauert? 🤔
- Was passiert, wenn wir die `/posts`-Route zweimal hintereinander aufrufen? 🤔

---

### Platzhalter für Wartezeiten

- Während eine Route gerendert wird, kann Next.js eine Fallback- bzw. Platzhalter-Komponente anzeigen
- Diese wird solange dargestellt, bis alle Promises in der Routen-Komponente aufgelöst werden konnten
- Die Platzhalter-Komponente wird an derselben Stelle im Layout dargestellt, wie auch die Routen-Komponente
- Wenn die Routen-Komponente fertig gerendert wurde, wird nur der Bereich ausgetauscht
- Die Datei für eine Platzhalter-Komponente muss `loading.tsx` heißen und per `export default` eine Komponenten-Funktion exportieren
- Was du in dieser Komponente machst, bleibt dir überlassen
- `loading.tsx`-Dateien in tieferen Verzeichnissen überschreiben dabei `loading.tsx`-Dateien in höheren Verzeichnissen
  - oder umgekehrt: wenn in dem angeforderten Routen-Verzeichniskeine `loading.tsx`-Datei vorhanden ist, schaut Next.js in den höherliegenden Verzeichnissen
- wird keine `loading.tsx`-Datei gefunden, bleibt die Seite weiß...
- ```tsx
  // recipes/loading.tsx
  export default Loading() {
    return <div className={"LoadingSpinner"}>Please Wait...</div>
  }
  ```

---

### Caching

- **Caching** ist Next.js-spezifisch.
  - React macht keine Aussage, ob und wie Server Components oder Datenverkehr allgemein gecached werden soll.
- Eine einmal gerenderte Route wird von Next.js gecached.
- Das passiert im Browser und im Backend selbst
  - Wo und wie lange, hängt von einer ganzen Reihe von Faktoren ab
  - Zusätzlich werden auch die Ergebnisse von `fetch`-Aufrufen gecached
- Das Caching ist in der [Dokumentation beschrieben](https://nextjs.org/docs/app/building-your-application/caching)
- Das Caching [ändert sich in Next.js 15](https://nextjs.org/blog/next-15-rc#caching-updates)

---

### Übung: Asynchrone Server Komponenten

- **Baue die Komponente für die Blog-Post-Liste (`/posts`)**
- Kopiere bitte `blog-example/blog-material/00_initial/app/shared/material/postlistpage/Post.List.tsx` nach `blog-example/blog-workspace/app/shared/material/postlistpage` (bestehende `PostList.tsx`-Datei dort ersetzen)
- Du musst deine bestehende Komponente (`/app/posts/page.tsx`) nun erweitern:
  - (Falls du in der vorherigen Übung nicht fertig geworden bist, kopiere dir `schritte/10_routen_und_links` in dein Workspace)
- Die Funktion zum Laden der Blogposts ist schon fertig: `fetchPosts`
- Die geladenen Blogposts kannst Du mit der fast fertigen Komponente `PostList` rendern
- Du kannst entweder in `page.tsx` oder `PostList` auf das Promise "warten"
  - Welche Komponente nimmst du? Warum?
- Baue eine `loading`-Komponente, die angezeigt wird, während die Daten geladen werden
  - Gib darin einfach "irgendwas" aus oder verwende die fertige Komponente `LoadingIndicator`
  - Um die Komponente zu testen, kannst du das Laden der Daten künstlich verzögern:
    - gehe dazu in `demo-config.ts` und setze `delayPostList` z.B. auf `1600` (Verzögerung von 1,6 Sekunden)
- Eine Lösung findest du in `schritte/20_async_rsc/fertig`
- Wenn du fertig bist, bitte die Hand in Zoom heben ✋

---

### Mehr zu Next.js Routen

- Neben den "klassischen" Verzeichnisnamen, die URL-Segementen entsprechen, gibt es noch weitere Konventionen:
- Ein Pfad in Klammern (`(path)`) taucht in der URL nicht auf. Kann z.B. für eine gemeinsame Layout-Datei oder zur besseren Organisation verwendet werden, wenn man das nicht über die Hierarchie machen kann.
- ```typescript
  // /admin/user
  // /admin/articles
  // /admin/tags
  ```
- Wenn `articles` und `tags` sich ein Layout teilen soll (aber `/user` nicht), kann die Verzeichnisstruktur dafür so aussehen:
- ```typescript
  // /admin/user/page.tsx
  // /admin/(blog)/layout.tsx
  // /admin/(blog)/articles/page.tsx
  // /admin/(blog)/tags/page.tsx
  ```

---

### Mehr zu Next.js Routen

- Ein Pfad in eckigen Klammern (`/posts/[postId]`) definiert einen Platzhalter. Der Wert für das Segment in der URL wird der Komponente dann zur Laufzeit als Property an die Routen-Komponente übergeben
- Die Properties, die eine Routen-Komponente bekommt, sind von Next.js vorgegeben
- Die Werte für die variablen Segmente werden als Objekt mit dem Namen `params` übergeben
- Darin enthalten ist der Wert für jedes variable Segment(`[postId]`) ohne die eckigen Klammern (`postId`):
- ```typescript
  // /app/posts/[postId]/page.tsx

  type PostPageProps = {
    params: { postId: string };
  };

  export default function PostPage({ params }: PostPageProps) {
    // params.postId enthält den Wert aus der URL (R1, R2, ...)
    const postId = params.postId;

    // ...
  }
  ```

---

### Mehr zu Next.js Routen

- Mit der `notFound`-Funktion kann die [`not-found`-Komponente](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) gerendert werden
- Das ist zum Beispiel nützlich, wenn Daten geladen wurden, die es nicht gibt
- `notFound` bricht die Ausführung der Komponenten-Funktion ab, man braucht kein `return` hinzuschreiben
- ```tsx
  // /app/posts/[postId]/page.tsx
  import { notFound } from "next/navigation";
  export default async function RecipePage({ params }: PostPageProps) {
    const postId = params.postId;

    const post = await fetchPost(postId);
    if (!post) {
      notFound(); // kein return notwendig
    }

    return <Post post={post} />;
  }
  ```

- In der Datei `not-found.tsx` kannst Du dann per `export default` eine Komponente exportieren, die im Fehlerfall angezeigt wird
- ```tsx
  // /app/posts/[postId]/not-found.tsx
  export default function PostNotFound() {
    return <div>Post not found :-(</div>;
  }
  ```

---

### Rendering Modes in Next.js

- Routen können **statisch** oder **dynamisch** gerendert werden:
  - Wenn Next.js alle Informationen zu einer Route schon zur Buildzeit hat, wird es eine **statische** Route.
  - Dynamische Routen werden bei jedem Request neu erzeugt (z.B. bei variablen Pfad-Segmenten)
  - Das lässt sich in beiden Fällen (zumindest teilweise) pro Route auch ändern

---

### Dynamische und statische Routen

- Durch die Verwendung eines Platzhalters wird eine Route zu einer dynamischen Route, d.h. sie wird **nicht** im Build gerendert, sondern **nur** zur Laufzeit
  - Next.js kann hier nicht im Vorwege wissen, welche Werte für das variable Segment verwendet werden
  - Mit `getStaticPaths` kann das geändert werden
- Auch die Verwendung einiger Next.js APIs führt dazu, dass eine Route nicht mehr statisch, sondern dynamisch ist
  - Das betrifft Funktionen, die mit Daten aus einem Request arbeiten (`headers()` und `cookies()`)
- Ggf. wird das Ergebnis auf dem Server gecached

---

### Übung: eine dynamische Route

- **Implementiere die Route zur Einzeldarstellung eines Blog-Posts**
- Die Route muss in der Datei `app/posts/[postId]/page.tsx` liegen
- Definier den TypeScript-Typen für die Properties. Es muss darin ein `params`-Objekt mit dem `postId`-Eintrag geben.
- Lies in der Komponente die `postId` aus dem `params`-Objekt, das als `props` an die Komponente übergeben wird
- Dann kannst du die fertige Funktion `fetchPost` verwenden, um den Post zu laden
  - Wenn diese Funktion `null` zurückgibt, wurde der Blog-Post nicht gefunden, dann verwende `notFound()` um die (Default) Fehler-Komponente zu rendern
  - Wenn diese Funktion einen Post zurückliefert, kannst du das an die fertige `PostPageContent`-Komponente übergeben
- Was passiert, wenn ein Post nicht gefunden wurde? Testen kannst du das, in dem Du z.B. `/posts/123` aufrufst
- Eine Lösung findest Du in `schritte/30_dynamic_segments`
- Wenn du fertig bist, bitte die Hand in Zoom heben ✋
- **Optional**: baue eine `not-found`-Komponente, die einen Fehler anzeigt, wenn ein Post nicht gefunden wurde

---

## Suspense

- Suspense unterbricht das Rendern, wenn in einer Komponente "etwas" fehlt
- "Etwas" ist im Fall von RSC ein Promise, das nicht aufgelöst ist
  - Am Beispiel der `loading`-Komponente haben wir das schon gesehen (dort aber abstrahiert von Next.js)
- Dazu kann um eine Komponente die `Suspense`-Komponente von React gelegt werden
- ```tsx
  async function loadData(...) {}

  async function PostList() {
    const posts = await loadPosts();

    return <>...</>;
  }

  function PostListPage() {
    return <Suspense> fallback={"Please wait"}>
      <PostList />
    </Suspense>
  }
  ```

- Hier würde React zunächst die `fallback`-Komponente (`Please wait`) rendern und darstellen
- Wenn das Promise aufgelöst wird, rendert React dann die Komponente erneut für die finale Darstellung
- Das funktioniert mit "modernen" Bibliotheken übrigens auch in "klassischen" Single-Page-Anwendungen mit React
  - siehe zum Beispiel [useSuspenseQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery) von TanStack/React Query

---

### Suspense in Next.js

- Um die oberste Komponente einer Route (`page.tsx`) legt Next.js eine automatisch eine `Suspense`-Komponente
- Den `fallback` dafür implementieren wir in der Datei `loading.tsx`, die eine Komponente per `default export` exportieren muss
- Konzeptionell sieht das so aus:

- Eure Route:
- ```tsx
  // loading.tsx
  export default function Spinner() {
    return "Please Wait";
  }
  ```

- ```tsx
  // page.tsx
  export default async function PostListPage() {
    const data = await loadData();
    return <>...</>;
  }
  ```

- Next.js (dummy code!!!)
- ```tsx
  // Next.js (dummy code):
  import Fallback from "loading.tsx";
  import Page from "page.tsx";

  function Route() {
    return (
      <Suspense fallback={Fallback}>
        <Page />
      </Suspense>
    );
  }
  ```

---

### Streaming

- Wenn eine Komponente auf dem Server gerendert wird, kann React das Rendern bei einer `Suspense`-Komponente unterbrechen
- Dann wird der Rest der Seite schon zum Client gesendet
- Sobald die Komponenten unterhalb von `Suspense` gerendert werden konnten, werden diese zum Client nachgesendet
- Dieses Verhalten wird auch **Streaming** genannt.

---

### Wasserfall-Requests

- Die `PostPage`-Route benötigt Daten aus zwei Quellen: Den Blog-Post und dessen Kommentare
- Die Antwortzeit der beiden Requests dafür kann bei jedem Aufruf unterschiedlich lang sein
- In einer klassischen React-Architektur könnte es zu einem "Request-Wasserfall" kommen:
  - PostPage lädt die Post-Daten (`fetchPost`). So lange wird der Platzhalter angezeigt.
  - Dann wird die `PostPageContent`-Komponente gerendert
  - Diese lädt nun (ebenfalls) per `fetch` die Kommentare und stellt sich dar.
  - Die beiden Requests starten also nicht zeitgleich, und die Dauer, bis die Daten vollständig angezeigt werden können, setzt sich aus der Dauer der **beiden** Requests zusammen
- Kennt ihr das Problem? Meint ihr das ist ein Problem? Was könnte man dagegen tun 🤔

---

### Wasserfälle vermeiden

- Mit `Suspense` können wir grundsätzlich priorisieren, was uns wichtig(er) ist:
  1. Die Seite wird erst dargestellt, wenn **alle** Daten geladen sind
  2. Sobald "irgendwelche" Daten (Blog-Post **oder** Kommentare) geladen wurden, diese Daten sofort anzeigen.
  3. Auf den **Blog-Post warten**, und die Seite erst dann darstellen. Falls Kommentare "schneller" sind, die Kommentare nicht vorab anzeigen.
- <!-- .element: class="demo" --> Die ersten beiden Beispiel durchgehen
- <!-- .element: class="demo" --> Wie können wir das dritte Umsetzen? 🤔

---

### Wasserfälle vermeiden

- Mit `Suspense` können wir grundsätzlich priorisieren, was uns wichtig(er) ist:
  1. Die Seite wird erst dargestellt, wenn **alle** Daten geladen sind
  2. Sobald "irgendwelche" Daten (Blog-Post **oder** Kommentare) geladen wurden, diese Daten sofort anzeigen.
  3. Auf den **Blog-Post warten**, und die Seite erst dann darstellen. Falls Kommentare "schneller" sind, die Kommentare nicht vorab anzeigen.
- Für 1. setzen wir ein `Suspense` um die ganze Seite (z.B. in dem wir `loading.tsx` verwenden)
- Für 2. setzen wir jeweils ein `Suspense` um die **Komponente**, in der die Daten geladen werden
- Für 3. starten wir beide Requests sofort parallel beim Rendern der Page-Komponente
  - Diese wartet dann auf den Blog-Post-Request (`await fetchPost`)
  - Das Promise für den Kommentare-Request wird an die `PostComments`-Komponente gegeben
  - In der `PostComments`-Komponente wird auf die Daten gewartet (`await fetchComments`)
  - Um die `PostComments`-Komponente herum wird eine `Suspense`-Komponente gelegt.

---

### Übung: Suspense und Streaming

- **Lade die Kommentare zu einem Blog-Post**
- Die Route `/app/posts/[postId]/page.tsx` verwendet die `PostPageContent`-Komponente um den Blog-Post darzustellen
- In der `PostPageContent`-Komponente musst du nun noch die Bewertungen laden (`fetchComments`) und mit der `PostComments`-Komponente anzeigen
  - (Die `fetchComments`-Funktion und die `PostComments`-Komponente sind bereits fertig)
- Überlege dir, an welchen Stellen es aus deiner Sicht fachlich Sinn macht auf Daten zu warten und setze die `Suspense`-Komponente entsprechend
  - Du kannst die beiden Requests künstlich langsam machen, in dem Du in `demo-config.ts` bei `delayPostPage` und `delayPostComments` einen Timeout (in ms) einstellst.
- Falls du bei der vorherigen Übung nicht fertig geworden bist, kopiere die fertigen Dateien aus `30_dynamic_segments` in deinen Workspace-Ordner.
- Lösung in `schritte/40_suspense`

---

## Exkurs: zod

<!-- .slide: data-state="exkurs" -->

- Kennt ihr zod? https://zod.dev/ 🤔

---

# Zod

## <!-- .slide: data-state="exkurs" -->

- "TypeScript-first schema validation with static type inference"
- https://zod.dev/
- <!-- .element: class="demo" --> material/zod-user.ts

---

### TypeScript vs. JavaScript

<!-- .slide: data-state="exkurs" -->
<!-- .slide: class="left" -->

- Im folgenden ist mit **TypeScript** das Typsystem von TypeScript gemeint, das nur zur Buildzeit vorhanden ist
- Mit **JavaScript** ist der Code gemeint, den wir in JavaScript oder TypeScript schreiben, und der dann auch im Browser (als JavaScript) ausgeführt wird

* ```typescript
  // "TypeScript": zur Laufzeit weg
  type User = { lastname: string; firstname?: string };

  // "JavaScript"
  function login() {
    return { lastname: "Meier", firstname: null };
  }
  ```

---

### Problem: TypeScript-Typen sind zur Laufzeit weg

<!-- .slide: data-state="exkurs" -->

- Wenn man ein Objekt beschrieben hat, kann man das zur **Laufzeit** nicht mit TypeScript überprüfen
  - Hat uns der Server zur Laufzeit wirklich ein Objekt geschickt, das aussieht wie ein `User`?
- Für "echte" Validierungen sind TypeScript-Typen auch zu ungenau:
  - keine Wertebegrenzungen (bzw. nur sehr eingeschränkt)
  - Längen-Begrenzungen gibt es nicht
- Wenn man Validierung zur Laufzeit benötigt, kommt man um (JavaScript-)Code, der zur Laufzeit ausgeführt wird, nicht drumherum
- Also müssen die Validierungsregeln in JavaScript beschrieben werden.
- Dann sind diese aber redundant: in TypeScript (statische Typbeschreibung), in JavaScript zur Validierung während der Laufzeit

---

### Zod: Typen in JavaScript beschreiben und TS-Typen ableiten

<!-- .slide: data-state="exkurs" -->

- Aus dieser Not macht Zod eine Tugend:
- Wir beschreiben die Objekte in JavaScript...
- ...und können von der Beschreibung TypeScript Typen ableiten lassen
- ```typescript
  import { z } from "zod";

  const User = z.object({
    firstName: z.string(),
    lastName: z.string().nullish(),
  });

  type IUser = z.infer<typeof User>;
  ```

- Mit dem `User`-Objekt von zod können wir nun zur Laufzeit ein Objekt validieren
- Wenn das Objekt dem User-Schema entspricht, ist alles gut, sonst gibt es einen Fehler
- ```typescript
  const mayOrMayNotBeAUser = readUserFromServer();

  const user = User.parse(mayOrMayNotBeAUser);
  ```

- Die `parse`-Funktion fungiert gleichzeit als **Type Predicate Function**, so dass TypeScript
  danach auch weiß, wie `user` aussieht, unabhängig davon, was in `parse` übergeben wurde
- ```typescript
  declare function readUserFromServer(): unknown;

  const user = User.parse(readUserFromServer());
  //     ^? --> IUser
  ```

---

### Komplexe Regeln

<!-- .slide: data-state="exkurs" -->

- Mit Zod kann man die typischen Datentypen verwenden (Objekte, Arrays, string, number, boolean etc)
- Auch aus TypeScript bekannte Möglichkeiten wie `unions`, `extends`, `omit` oder `brand-Types` werden unterstützt
- Darüberhin kann man auch die gültigen Wertemengen und andere Constraints beschreiben
- ```typescript
  import { z } from "zod";

  const User = z.object({
    login: z.string().min(5),
    email: z.string().email(),
    status: z.string().emoji(), // 😊
    age: z.number().min(18).max(123),
  });
  ```

- Die `parse`-Funktion gibt dann detailierte Fehler, wenn ein überprüftes Objekt nicht diesen Regeln entspricht.

---

### Integration von Zod

<!-- .slide: data-state="exkurs" -->

- Es gibt eine Reihe von Integrationen in bestehende Bibliotheken, z.B.:
  - Validieren von Formularen in [React Hook Form
    ](https://react-hook-form.com/) mit dem [zod-Resolver](https://github.com/react-hook-form/resolvers#zod)
  - Validieren von [`FormData`-Objekten](https://developer.mozilla.org/en-US/docs/Web/API/FormData) mit [zod-form-data](https://www.npmjs.com/package/zod-form-data)
  - Generieren von Zod-Typen aus OpenAPI Spezifikationen mit [typed-openapi](https://github.com/astahmer/typed-openapi)

---

### Zod und Next.js

<!-- .slide: data-state="exkurs" -->

- Ob bzw. wie ihr Zod in eurer Anwendung einsetzt, bleibt natürlich euch überlassen
- In der Beispiel-Anwendung wird Zod verwendet, um Daten, die von der Backend API gelesen wurden zu validieren

---

### Übung: Zod

<!-- .slide: data-state="exkurs" -->

- **Beschreibe ein Objekt-Schema mit Zod**
- In `workspace-blog/exkurs/zod/zod-user.test.ts` findest Du ein `User`-TypeScript-Objekt
- Schreibe dafür das Pendant in zod
- In der Datei findest du TODOs mit Hinweisen
- In der Datei befinden sich einige Tests. Diese sollten "grün" sein, wenn du das Objekt korrekt beschrieben hast
- Zum Ausführen der Tests kannst Du `pnpm test` (oder `npm test`) im Verzeichnis `workspace-blog` verwenden
- Mögliche Lösung findest Du in `workspace-blog/schritte/50_zod/`

---

### Error Handling in React und Next.js

---

## Error Boundaries

<!-- .slide: id="t-error-boundaries" -->

- 🤔Was passiert, wenn in unserer App ein Fehler auftrett 🤔
- <!-- .element: class="demo" -->demo_config failPostRequestForId setzen
- <!-- .element: class="demo" -->Error Boundary (Next.js): error.tsx
- <!-- .element: class="demo" -->Error Boundary (React): Error Boundary um Kommentare

---

## Error Boundaries

- Wenn beim **Rendern** etwas schiefgeht, verwirft React "zur Sicherheit" den ganzen Komponenten-Tree
  - (damit nicht z.B. inkonsistente oder fehlerhafte Daten angezeigt werden)
- Das ist nicht besonders benutzerfreundlich
- In einem Event-Handler haben wir dieses Problem nicht: dort können wir z.B. mit try/catch arbeiten
  - oder der Event-Handler wird einfach abgebrochen und die "alte" UI bleibt weiterhin sichtbar
- Beim Rendern können wir aber kein try/catch drumherum legen
- Deswegen gibt es "spezielle" Komponenten: **Error Boundaries**

---

### Error Boundaries

- Error Boundary-Komponenten kann man überall in seiner Komponenten-Hierarchie einziehen
- Render-Fehler, die unterhalb auftreten, werden dann der Error Boundary-Komponente übergeben
  - Diese kann dann z.B. eine Fehler-Komponente darstellen
  - Dieses Verhalten ähnelt try-catch.
  - Auch try-catch-Blöcke in "normalem" Code könnt ihr ja auf jeder Ebene des Call-Stacks einziehen
- Ein Beispiel:
- ```typescript
  function MyApp() {
    return (
      <Layout>
        <Header />
        <MyErrorBoundary>
            <Main>
              <BlogPost />
            </Main>
            <NewsletterForm />
        </MyErrorBoundary>
      </Layout>
    )
  }
  ```
- Wenn es hier zum Fehler **während des Renderns** kommt:
  - innerhalb von `Layout` oder `Header`: weiße Seite, Fehlermeldung auf der Console
  - innerhalb von `Main`, `BlogPost` oder `NewsletterForm`: Error Boundary wird angezeigt, `Layout` und `Header`-Komponente bleiben unverändert (gerendert)

---

### Fehlerbehandlung in Next.js

- In Next.js könnt ihr Fehler auf Routen-Ebene mit einer [`error.tsx` Datei behandeln](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- Diese Datei muss eine **Client Komponente** exportieren
- Die Komponente wird von Next.js als Error Boundary-Komponente um eure komplette Route gelegt
- Die Komponente bekommt zwei Properties übergeben: `error` und `reset`
  - `error` ist das `Error`-Objekt, das den Fehler ausgelöst hat
  - `reset` ist eine Callback-Funktion, die ihr verwenden könnt, um den Fehler zu verwerfen
- Wenn eine Route _keine_ `error.tsx`-Datei hat, sucht Next.js in den oberen Verzeichnissen, bis eine Komponente gefunden wird
  - sonst wird Default-Fehler angezeigt

---

### Serverseitige Fehler in Next.js

- <!-- .element: class="demo" -->pnpm build:clean und Fehlerseite aufrufen
- Wenn in einer React **Server** Komponent ein Fehler auftritt, wird ebenfalls die nächste `error.tsx`-Komponente gerenert
- Aus Sicherheitsgründen entfernt [Next.js hier aber die Fehlerinformationen](https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-server-errors)
- Damit ihr den Fehler identifizieren könnt, gibt euch Next.js einen `digest` im `error`-Objekt
- Diesen findet ihr in den Konsolen-Logs von Next.js

* ```tsx
  type ErrorHandlerProps = {
    error: Error & { digest: string }; // Next.js-Erweiterung des Error-Objektes:
  };
  function ErrorHandler({ error }: ErrorHandlerProps) {
    return (
      <div>
        <h1>Etwas ist schiefgelaufen!</h1>
        <p>
          Bitte nennen Sie folgenden Code an unseren Support: {error.digest}
        </p>
      </div>
    );
  }
  ```

---

### Error Boundaries

- Behandlung der Fehler auf Routen-Ebene ist möglicherweise zu grob granular
- Ihr könnt auch einzelne Komponenten mit eigenen Error Boundaries umschliessen
- Eine Error Boundary-Komponente ist eine Art `catch`-Block für die Renderphase von Komponente
- Technisch handelt es sich dabei um eine fast "normale" React-Komponente
- Diese muss allerdings noch mit der (alten) React JavaScript Klassen API gebaut werden
- Diese Klasse muss dann die [getDerivedStateFromError](https://react.dev/reference/react/Component#static-getderivedstatefromerror) Callback-Funktion implementieren
- Einfacher ist es, eine fertige Error Boundary-Komponente zu verwenden: [react-error-boundary](https://github.com/bvaughn/react-error-boundary)

---

### Error Boundary mit `react-error-boundary`

- Die Error Boundary-Komponente aus der Bibliothek heißt - Überraschung! - `ErrorBoundary`
- Die ist sehr flexibel zu konfigurieren
- Man muss ihr mit dem Property [FallbackComponent eine Komponente übergeben](https://github.com/bvaughn/react-error-boundary?tab=readme-ov-file#errorboundary-with-fallbackcomponent-prop), die im Falle eines Fehlers gerendert werden soll
  - (das ist euer "try-Block")
- Diese Komponente bekommt dann als Property u.a. den Fehler übergeben:
- ```typescript
  import { FallbackProps } from "react-error-boundary";

  function AppErrorMessage( { error }: FallbackProps) {

    console.error("Something bad happend:", error);
    return <h1>Something bad happend !</h1>;
  }
  ```

- ```typescript
  import { ErrorBoundary } from "react-error-boundary";
  function MyApp() {
    return (
      <Layout>
        <Header />
        <ErrorBoundary fallback={AppErrorMessage}>
            <Main>
              <BlogPost />
            </Main>
            <NewsletterForm />
        </ErrorBoundary>
      </Layout>
    )
  }

  ```

---

### react-error-boundary

- Der `FallbackComponent`-Komponente wird überdies eine Funktion `resetErrorBoundary` übergeben
- Die könnt ihr aufrufen, dann wird erneut versucht, den Komponenten-Tree unterhalb der `ErrorBoundary`-Komponente zu rendern
- Das macht Sinn wenn es Grund zur Annahme gibt, der Fehler verschwinde später (z.B. Netzwerkverbindung ist wieder in Ordnung)
- ```typescript
  import { FallbackProps } from "react-error-boundary";

  function AppErrorMessage( { error, resetErrorBoundary }: FallbackProps) {

    console.error("Something bad happend:", error);
    return (
      <div>
        <h1>Something bad happend !</h1>
        <button onClick={ () => resetErrorBoundary() }>Try again!</button>
      </div>
    );
  }
  ```

- Wenn ihr eine Möglichkeit habt, einen fehlerhaften Zustand zu reparieren, könnt ihr an der `ErrorBoundary`-Komponente eine `onReset`-Funktion angeben
- Diese wird dann aufgerufen, wenn ihr `resetErrorBoundary` in der Fallback-Komponente aufruft

---

### react-error-boundary

- Normalerweise werden Error Boundary-Komponenten von React nur dargestellt, wenn ein Fehler **beim Rendern** auftritt
- Die `ErrorBoundary`-Komponente von `react-error-boundary` könnt ihr aber auch manuell rendern lassen, wenn z.B. in einem Event ein Fehler auftritt.
  - So könnt ihr eure Fehlerbehandlung dann auf alle Arten von Fehlern in eurer Anwendung anwenden
- Um die `ErrorBoundary`-Komponente anzuzeigen, verwendet ihr den `useErrorBoundary`-Hook:
- ```typescript
  import { useErrorBoundary } from "react-error-boundary";

  function PostEditor() {
    const { showBoundary } = useErrorBoundary();

    async function saveBlogPost() {
      try {
        await fetch("...");
      } catch (e) {
        showBoundary("Could not save blog post");
      }
    }
    return ...;
  }
  ```

- Genau wie bei Error Boundaries, die beim Rendern aktiv werden, wir hier auch die nächsthöhere `ErrorBoundary`-Komponente angezeigt

---

### Übung: Error Boundaries

- **Implementiere die Fehlerbehandlung beim Lesen eines Blog Posts**
- Teil 1: Wenn beim Lesen eines Blog-Posts ein Fehler auftritt, soll eine Fehlermeldung dargestellt werden
  - Schreibe dafür eine `error.tsx`-Datei
  - Kannst du dort die Fehlermeldung ausgeben?
  - Um einen Fehler zu simulieren, trage in `demo-config.ts` in der Konstante `failPostRequestForId` die Id eines Blog-Posts ein. Wenn du diesen dann in der Einzeldarstellung aufrufst, wird künstlich ein Validierungsfehler erzeugt
- Teil 2: (optional): Fehlerbehandlung für das Lesen der Kommentare
  - Simuliere einen Fehler beim Laden der Kommentare. Trage dazu in `demo-config.ts` in der Konstante `failCommentsPostRequestForId` die Id eines Blog-Posts ein. Wenn du diesen in der Einzeldarstellung aufrufst, wird beim Laden der Kommentare ein Fehler ausgelöst (`failPostRequestForId` auf Leerstring zurücksetzen!)
  - Wo wird der Fehler angezeigt?
  - Kannst du eine ErrorBoundary-Komponente bauen, die dazu führt, dass es zwar eine Fehlermeldung gibt ("Fehler beim Laden der Kommentare"), aber die restliche Seite (insb. der Blog-Post) trotzdem dargestellt wird?
- Falls Du bei der letzten Übung nicht fertig geworden bist, kopiere dir den Stand aus `schritte/40_suspense`.
- Eine Lösung findest Du in `60_errors`
- Wenn Du fertig bist, bitte die Hand in Zoom heben ✋

---

### Ausblick: Fehler protokollieren

- <!-- .element: class="demo" --> Server Action mit useEffect zur Protokollierung verwenden
- Ihr könnt die Error Boundaries nutzen, um die Fehler auf dem Server zu protokollieren
- Zum Zugriff auf dem Server könnt ihr eine Server Action nehmen
  - oder einen eigenen HTTP-Endpunkt (Next.js API Route z.B.)
- Das ist in jedem Fall ein Seiteneffekt, d.h. mit `useEffect` ummanteln!
- Achtung! Dabei sicherstellen, dass es bei Fehlern beim Protokollieren nicht zu Folge-Fehlern kommt...
- Aufpassen, welche Informationen ihr an das Backend schickt (nicht, dass da z.B. ein Passwort im Fehlertext vorkommt)
  - (Das gilt auch für Fehler, die das Backend an den Client schickt!)
  - Immer nur so wenig wie möglich Informationen über die Leitung schicken

---

## Aufteilung in Server-Client-Komponenten

---

### Konsequenzen

- React Server Component können keine Hooks verwenden und auch sonst nicht interaktiv sein
- `useState` oder `useEffect` zum Beispiel gehen beide nicht und auch Next.js Hooks wie `useRouter` oder `usePathname`
- Für alle Stellen, an denen wir Interaktivität benötigen, müssen wir **Client Components** bauen
- Das sind Komponenten, die sich wie bisherige "klassische" React-Komponenten verhalten:
  - Ihr JavaScript-Code wird bei Bedarf zum Client geschickt
  - der JavaScript-Code wird im Client ausgeführt
- Eine Client-Komponente wird mit der `"use client"`-Direktive am Beginn einer Datei ausgezeichnet:
- ```tsx
  "use client";

  export function FeedbackForm() {
    // hier jetzt Hooks etc. erlaubt
    const [name, setName] = useState("");
  }
  ```

---

### Konsequenzen

<img src="/slides/images/react-anwendung.png" style="max-height:900px;float:left"/>

- **Eine "normale" React-Anwendung im Browser**:
- State befindet sich oben
- Daten werden runtergereicht ("props")
- Callbacks werden runtergereicht
- Über Callbacks kann State-Veränderung ausgelöst werden

---

### Konsequenzen

<img src="/slides/images/fullstack-anwendung.png" style="max-height:900px;float:left"/>

- **Komponenten auf dem Server**:
- Auf dem Server gibt es keinen State!
- ...und keine Interaktion
- Wir haben nur statischen Content (RSC)
- Wir haben **Daten**
  - z.B. aus DB, Microservice, Filesystem...

---

### Konsequenzen

<img src="/slides/images/interaktives-muss-auf-den-client.png" style="max-height:900px;float:left"/>

- Bestimmte Teile **müssen** auf den Client
  - alles was mit Interaktion zu tun hat
    - z.B. Event-Handler
  - alles was Browser-spezifisch ist
    - z.B. `window`

---

### Konsequenzen

<img src="slides/images/url-aendern.png" style="max-height:900px;float:left"/>

- Properties müssen Client-Server-Grenze überwinden
- Müssen serialisierbare Daten sein
- Keine (Callback-)Funktionen!
- Keine Props und State-Änderungen
- Stattdessen: _Server-Requests_
  - z.B. URL ändern
  - z.B. Search-Parameter

---

### Konsequenzen

<!-- .slide: class="left" -->

- Eine **Client-Komponente**
  - wird mit `use client` gekennzeichnet
  - Alle Komponenten darunter werden dann als Client-Komponenten angenommen
  - Ist auf Client-seite interaktiv (JavaScript-Code im Browser vorhanden)
  - Muss eine neue **Darstellung** vom Server anfordern
  - Beispiel, das die Search-Parameter in der URL verändert:
- ```tsx
  "use client";

  import { useSearchParams } from "next/navigation";

  export default function OrderByButton({ orderBy, label }) {
    const searchParams = useSearchParams();

    const currentOrderBy = searchParams.get("orderBy");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", orderBy);

    const href = `/posts?${newParams.toString()}`;

    return <Link href={href}>{label}</Link>;
  }
  ```

---

### Konsequenzen

<!-- .slide: class="left" -->

- Auf der **Server-Seite**:
  - Statt "klassischer" Props werden hier nun Search Params verwendet
  - Routen-Komponenten (`page.tsx`) in Next.js können sich die Search-Parameter als Property `searchParams` übergeben lassen
    - (`params` für Segmente im Pfad, `searchParams` für die Query-Parameter hinter dem `?` in der URL)
- ```tsx
  type PostListPageProps = {
    searchParams: {
      orderBy?: "asc" | "desc";
    };
  };

  export default async function PostListPage({
    searchParams,
  }: PostListPageProps) {
    const orderBy = searchParams.orderBy;

    const result = fetchPosts(orderBy);

    return <PostList posts={result} />;
  }
  ```

---

### Server- und Client-Komponenten

- Alle Komponenten, die von einer Client-Komponente (`use client`) aus gerendert werden (direkt oder indirekt) sind Client Komponenten
- Das heißt deren JavaScript-Code wird ebenfalls zum Client geschickt und dort ausgeführt
- Komponeten, die nicht explizit gekennzeichnet sind, können **beide** Rollen einnehmen
- Sie müssen dann aber auch Anforderungen beider Komponenten-Typen erfüllen:
  - **keine** Verwendung von Server-APIs wie Datenbanken
  - **keine** Verwendung von Browser-spezifischen APIs (z.B. `window` oder hooks)
- Wenn sie als Server Component verwent werden, wird ihr JavaScript-Code nicht zum Client geschickt
- Next.JS rendert die Client Component serverseitig vor
- Erst wenn eine Komponente als Client Komponente benötigt wird, der JS-Code vom Server abgefragt

---

[//]: # "### Konsequenzen: Was bedeuten die neuen Features"
[//]: #
[//]: # "- Wird Code durch URL-Handling komplexer?"
[//]: #
[//]: # "- Wo ziehen wir Server/Client-Grenze?"
[//]: #
[//]: # "  - Button? Ganzes Formular?"
[//]: #
[//]: # "- Ganze Seite (oder Teile) werden neu gerendert"
[//]: #
[//]: # "  - Fertiges UI kommt dafür vom Server"
[//]: # "  - Das kann mehr Daten als bei (REST-)API-Call bedeuten!"
[//]: #
[//]: # "- Was fällt euch noch ein? 🤔"
[//]: #
[//]: # "---"

### Übung: Interaktionen

- **Implementiere den Order-Button**
- Die Blog-Liste (`/app/posts/page.tsx`) soll sortierbar gemacht werden
- In der Datei `/app/posts/page.tsx`:
  - Du musst den TypeScript-Typen für die Properties mit den `searchParams` definieren (`searchParams` muss ein optionales Property `order_by` enthalten, dass entweder String `asc` oder `desc` ist)
  - Übergib den aktuellen `order_by` an die `fetchPosts`-Funktion
  - Füge die fertige `PostListOrderButtons` ein (oberhalb von `<PostList ... />`)
- In `OrderByButton.tsx`:
  - dort musst Du die Button-Logik zum Aktualisieren der SearchParams vervollständigen
  - TODOs findest du in der Datei
  - An die aktuellen Search-Parameter kommst Du mit dem Next.js Hook [`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- Lösung in `schritte/70_search_params/fertig`

[//]: # "---"
[//]: #
[//]: # "### useTransition"
[//]: #
[//]: # '- <!-- .element: class="demo" -->: `OrderButton` mit Transition'
[//]: # "- Mit dem `useTransition`-Hook von React (18) können Updates priorisiert werden"
[//]: # '- Dazu wird eine Funktion angegeben, in der eine "Transition" beschrieben ist (z.B. durch das Setzen eines States)'
[//]: # "- Wenn React die Komponente daraufhin neu rendert, **und** eine weitere/andere State-Änderung durchgeführt wird, bricht React das rendern ab (und startet es ggf. später neu)"
[//]: # '- Mit `useTransition` kann also ausgedrückt werden: dieses Rendern ist nicht so "wichtig" (nicht so "dringend")'
[//]: # "- Mit Client-seitigem React kann auf diese Weise zum Beispiel sichergestellt werden, dass Updates, die durch Benutzer-Eingaben entstehen, nicht vom Rendern eines Suchergebnisses unterbrochen werden"
[//]: # '  - Hier wäre das Aktualisieren des Suchergebnisses weniger "dringend", als die Darstellung der aktualisierten Eingabe'
[//]: # "- Der `useTransition`-Hook liefert zwei Parameter zurück:"
[//]: # "  - `const [isPending, startTransition] = useTransition()`"
[//]: # "- Mit `startTransition` kann die Transition gestartet werden (Funktion übergeben)"
[//]: # "- `isPending` liefert zurück, ob die Transition gerade läuft"
[//]: #
[//]: # "---"
[//]: #
[//]: # "### Beispiel: useTransition mit Suspense"
[//]: #
[//]: # "- Wenn man einen von einer Seite auf eine andere Seite mit dem Next.js Router durchführt, kann man mit `useTransition` auf der Ursprungsseite bleiben, bis die Ziel-Seite fertig gerendert ist"
[//]: # "  - Die Ziel-Seite wird dann in Hintergrund gerendet, und solange ist `isPending` `true`"
[//]: # "- ```tsx"
[//]: # "  export function OrderButton() {"
[//]: # "    const router = useRouter();"
[//]: # "    const [isPending, startTransition] = useTransition();"
[//]: #
[//]: # "    const handleClick = () => {"
[//]: # '      startTransition(() => router.push("/..."));'
[//]: # "    };"
[//]: #
[//]: # "    return isPending ? ("
[//]: # "      <button>Sorting...</button>"
[//]: # "    ) : ("
[//]: # "      <button onClick={handleClick}>Order by date</button>"
[//]: # "    );"
[//]: # "  }"
[//]: # "  ```"

---

### Next.js: Caching

- Next.js implementiert ein [sehr aggressives Caching](https://nextjs.org/docs/app/building-your-application/caching) auf vielen Ebenen
- Gecached werden z.B. Komponenten, aber auch fetch-Requests
  - Wenn du `fetch` in deinem Code verwendest, werden die GET-Requests von Next.js gecached!
- Das kann man alles ausschalten, aber es ist am Anfang gewöhnungsbedürftig

  - Deswegen auch das `dev:clean`-Script in der `package.json`

- Meiner Erfahrung nach ist das nicht trivial zu verstehen und scheint auch noch Bugs zu haben
- Es gibt eine [ausführlichen Dokumentation](https://nextjs.org/docs/app/building-your-application/caching), welche Caches es gibt und wie die jeweils funktionieren

- Darin enthalten ist auch eine [Matrix](https://nextjs.org/docs/app/building-your-application/caching#apis), aus der hervorgeht, welche Next.js Funktionen Auswirkungen auf den Cache haben
- **Mit Next.js Version 15 [ändert sich das Caching-Verhalten](https://nextjs.org/blog/next-15-rc#caching-updates)**

  - Eventuell wird es dadurch besser verständlich, da man es an mehr Stellen explizit einschalten muss

---

### Next.js: Caching

- Man kann die einzelen Cachings ausschalten, bzw. revalidieren lassen
- Bei `fetch`-Requests kann man ein Next.js-proprietäres Property angeben:
- ```typescript
  fetch("http://localhost:7000/posts", {
    // Next-proprietäre Erweiterung der fetch-API:
    // ab Next.js 15 ist 'no-store' der Default
    cache: "force-cache", // oder:  'no-store'
  });
  ```
- Einem `fetch`-Request können außerdem **Tags** zugeordnet werden
- Diese kann man verwenden, um den Cache-Eintrag per API als veraltet zu markieren
- ```typescript
  const r = await fetch(`http://localhost:7000/posts`, {
    next: {
      tags: ["posts"],
    },
  });
  ```
- ```typescript
  // Invalidieren des Caches:
  import { revalidateTag } from "next/cache";

  revalidateTag("posts");
  ```

- Alternativ geht das auch mit Pfaden (`revalidatePath`), da könnt ihr einen Pfad angeben
- Wie lange eine statische **Route** gecached werden soll, kann mit [`revalidate`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate) festgelegt werden
  - Davon unbenommen ist aber das fetch-Caching (s.o.)
- Wichtig! Das funktioniert nur in serverseitigem Code!

---

## Mutations

---

## Mutations

### Verändern von Daten

- Das **Schreiben** von Daten kann grundsätzlich so wie bislang auch umgesetzt werden:
  - Zum Beispiel in dem ein `form` übertragen wird
  - Oder, wie in React üblich, ein REST-Aufruf an den Server mit `fetch`gemacht wird
- Aber!
  - Nach dem Verändern von Daten muss die UI aktualisiert werden
  - Mangels State auf dem Client geht das aber nicht wie bislang
  - Der **Server** muss nach Datenänderungen **aktualisierte UI** liefern

---

### UI bzw. Routen aktualisieren (Next.js spezifisch)

- Möglichkeit 1:
  - Client-seitig kann man mit [`Router.refresh`](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) die aktuelle Route - unabhängig vom Cache - aktualsieren lassen. Next.js rendert die Route dann auf dem Server neu und liefert aktualisierte UI
- Möglichkeit 2:
  - Invalidieren des Caches mit `revalidatePath` bzw. `revalidateTags`

---

### Server Actions

- <!-- .element: class="demo" -->Likes-Button Action!
- **Server Actions** sind Funktionen, die auf dem Server laufen und aus einer Client-Komponente aufgerufen werden können

  - Eine Art remote-procedure Call
  - React bzw. Next.js stellt für jede Server-Action-Funktion transparent einen HTTP-Endpunkt zur Verfügung
  - Die Funktion kann beliebige Parameter entgegen nehmen und zurückliefern
    - Einschränkung: Werte müssen serialiserbar sein
    - Die Funktion **muss** asynchron sein, da die Kommunikation immer asynchron ist
    - Die Funktionen müssen in einer Datei stehen, die explizit mit `"use server"` gekennzeichnet ist

- ```typescript
  "use server";

  export async function addLike(postId: string) {
    const result = await saveLikeToBackend(postId);

    return result.newLikes;
  }
  ```

---

### Server Actions

- Der Aufruf einer Server-Action-Funktion erfolgt aus der Komponente wie bei einer normalen Funktion
- ```tsx
  function LikeButton({ post }) {
    const [likes, setLikes] = useState(post.likes);

    const onSaveClick = async () => {
      // SERVER REQUEST !
      const newLikes = await addLike(post.id);
      setLikes(newLikes);
    };

    return <div onClick={handleLikeClick}>{likes}</div>;
  }
  ```

---

### Aktualisieren der UI

- In dem gezeigten Beispiel wird die Darstellung der Likes aktualisiert, wenn der Request zurückkommt
- Die gecachte Darstellung, bleibt allerdings unverändert
- Wenn ein anderer Nutzer die Seite aufruft, wird die alte Darstellung aus dem Cache geliefert und die Anzahl der Likes stimmt nicht
- Aus diesem Grund muss hier Next.js mitgeteilt werden, welche Routen "revalidiert" werden müssen
- Das kann mit den gezeigten Funktionen `revalidatePath` bzw. `revalidateTags` passieren
- ```tsx
  "use server";

  export async function addLike(postId: string) {
    const result = await saveLikeToBackend(postId);

    revalidateTag("posts"); // Liste mit den BlogPosts
    revalidateTag(`posts/${postId}`); // Einzeldarstellung

    return result.newLikes;
  }
  ```

- Das funktioniert in unserem Beispiel deswegen, weil die `fetch`-Aufrufe die für die Liste- bzw. Einzeldarstellung entprechende Tags gesetzt haben:

* ```typescript
  async function fetchPosts() {
    fetch("...", { next: { tags: ["posts"] } });
    // ...
  }

  async function fetchPost(postId: string) {
    fetch("...", { next: { tags: [`posts/${postId}`] } });
    // ...
  }
  ```

---

### Server Actions und Transitions

- Server Actions können mit einer Transition umschlossen werden
- Dann kannst Du prüfen, ob die Action noch läuft und ggf. einen Hinweis rendern
- ```tsx
  export function LikesWidget({post}) {
    const [likes, setLikes] = useState(recipe.likes);
    const [isPending, startTransition] = useTransition();

    const onSaveClick = () => {
       startTransition( async () => {
         const newLikes = await addLike(post.id);
         setLikes(newLikes);
       })
     };

     return isPending ?
       <div>Like is updating!<div> :
       <div onClick={handleLikeClick}>{likes}</div>
  }
  ```

---

### Optimistische Aktualisierungen

- Mit React 19 gibt es einen neuen Hook: [useOptimistic](https://19.react.dev/reference/react/useOptimistic)
- Dieser stellt einer Komponente einen "optimistischen" Zustand zur Verfügung, solange eine async Action läuft
  - Das geht in Client Komponenten (auch ohne Framework) und in Server Components
- Damit kannst Du das erwartete Ergebnis einer Action bereits in der UI visualisieren
- Benutzer bekommen so ein schnelleres Feedback:
  - während die Action läuft das "optimistische" Ergebnis
  - danach das neue Ergebnis (oder altes im Fehlerfall)

---

### Der useOptimistic-Hook

<!-- .element: class="left" -->

- `useOptimistic` erwartet zwei Parameter:
  - den aktuellen "echten" Zustand (ohne Action)
  - eine (Reducer) Update-Funktion, die auf Basis des aktuellen Zustands und einer Action den optimistischen Zustand berechnet
- Der Hook liefert ein Array mit zwei Werten zurück:
  - den berechneten optimistischen Zustand (oder den echten, falls keine Action läuft)
  - eine Dispatch-Funktion, die die Update-Funktion auslöst, um einen optimistischen Zustand zu berechnen
- Wenn man die `updateFn` nicht angibt, kann mit der Dispatch-Funktion direkt der optimistische Wert gesetz werden
  - Das steht so nicht in der React-Doku, funktioniert aber (im [React Source-Code](https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js#L206) ist der Paramter auch optional )

---

### Der useOptimistic-Hook

<!-- .element: class="left" -->

- ```tsx
  function LikesWidget({ post }) {
    const [likes, setLikes] = useState(0);
    const [optimisticLikes, changeLikes] = useOptimistic(
      likes,
      (currentLikes, action) => {
        // action kann beliebiges Objekt sein, wie in einer Reducer-Funktion
        // hier soll es der Wert sein, um den currentLikes erhöht/gesenkt werden soll
        return currentLikes + action;
      },
    );

    const handleIncreaseLikes = () => {
      startTransition(async () => {
        setOptimisticLikes(+1);
        const result = await increaseLikes(post.id);
        setLikes(newLikes);
      });
    };

    return <button>{optimisticLikes}</button>;
  }
  ```

---

### Übung: Server Actions

- **Baue eine Server Action zum "liken" eines Blog-Posts**
- Implementiere die Logik zum Hochzählen in der Server Action Funktion `increaseLikes` in `like-actions.ts`
  - Die Funktion zum Speichern der Likes (`saveLike`) ist bereits fertig. Du übergibst dieser Funktion nur die Blog-Id (`blogId`), die Likes werden dann Backend-seitig hochgezählt
  - Weitere Todos findest Du in `like-action.ts`
- Ergänze dann die Komponente in `LikeButton.tsx`. Hier musst Du nun deine neue Server-Action-Funktion aufrufen.
  - Auch in dieser Datei findest du Todos
- Fertige Lösung in: `schritte/80_server_actions`
- **Optional**: Kannst Du die Ausführung der Server Action mit einer Transition ummanteln?

---

## Formulare

---

### Formulare mit React: Controlled vs. Uncontrolled Components

- <!-- .element: class="demo" --> PostEditor-Formular
- Bei Input-Elementen in einem Formular unterscheidet React zwischen **controlled** und **uncontrolled** components
  - Bei **controlled** Components hält die React-Componente im State die Daten, die z.B. im Eingabefeld stehen sollen.
    - React synchronisiert die in den DOM und informiert uns bei Änderungen, so dass wir unseren State aktualisieren können.
  - Bei **uncontrolled** steht der Inhalt nur im DOM
    - Wir können z.B. `onBlur` beim Verlassen des Feldes darauf zugreifen
- Lange Zeit war die Empfehlung, **controlled** Components
  - Das hat sich im letzten Jahr geändert

---

### Probleme mit Controlled Components

- Man braucht JavaScript, damit das funktioniert
- Man muss sich um die Synchronisierung kümmern (State <-> UI)

---

### Progressive Enhancement

- Mit Next.js (bzw. künftigen React APIs) soll es möglich sein, Formulare so zu bauen, dass man sie auch ausfüllen und absenden kann, wenn kein JavaScript im Browser läuft (**Progressive enhancement**)
- Wofür könnte das relevant sein? 🤔
- Welche Einschränkungen könnte es dabei geben? 🤔

---

### Formulare

- <!-- .element: class="demo" -->Feedback Form
- Um Formulare ohne JavaScript absenden zu können, muss es genauso aussehen, als wenn man ein Formular in einer statischen HTML-Seite beschreibt:
  - dazu muss ein HTML `form`-Element mit einem `action`-Attribute verwendet werden
  - Damit das Formular abgesendet werden kann, muss es einen `submit`-Button geben
- In "regulärem" HTML wird der Form-Inhalt dann an den in der `action` angegebenen Endpunkt geschickt
- Der Payload ist ein `FormData`-Objekt
- Mit Next.js (bzw. React) können wir als `action` eine (Server-)Action-Funktion angeben
- Die angegebene (Server-)Action muss als Parameter ein `FormData`-Objekt entgegennehmen

---

### Formulare: Actions

- Beispiel: Mit Server Action
- ```tsx
  export function FeedbackForm() {
    async function saveForm(data: FormData) {
      "use server";
      // AUF DEM SERVER: Formular speichern
      const title = data.get("title");
      // In DB speichern, Backend Service aufrufen
    }

    return (
      <form action={saveForm}>
        <input name="title" />
        <input name="body" />
      </form>
    );
  }
  ```

- Beispiel: Mit Client Action
- ```tsx
  export function FeedbackForm() {
    async function saveForm(data: FormData) {
      const title = data.get("title");
      const body = data.get("body");

      fetch("http://blog-api.de", {
        method: "POST",
        body: JSON.stringify({ title, body }),
      });
      // ...
    }

    return (
      <form action={saveForm}>
        <input name="title" />
        <input name="body" />
      </form>
    );
  }
  ```

* 🚨 👮‍Bitte in keinem Fall in eurem Backend die Validierung vergessen!

---

### Formulare mit Action State

- Für Formulare könnt ihr einen "Action State" festlegen.
- Damit könnt ihr beim Submit auf die vorherigen Formular-Daten zugreifen
- Die zugehörige Action wiederrum liefert neuen State zurück, der dann in der Komponente zur Verfüng steht
- Das ist insbesondere für Formulare sinnvoll, wenn diese ohne JavaScript funktionieren sollen.
- Doku: [useActionState-Hook](https://19.react.dev/reference/react/useActionState)
