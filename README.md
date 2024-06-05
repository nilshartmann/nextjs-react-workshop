# Workshop: React und Next.js

Dieses Repository (https://github.com/nilshartmann/nextjs-react-workshop) enthält den Source-Code für die Beispiel-Anwendung sowie den Workspace für unsere Übungen. Bitte klone dir das Repository lokal auf deinen Computer.

Im folgenden findest Du beschrieben, wie du den Workspace einrichtest und die Anwendung für die Übung startest.

## Voraussetzungen

Um sicherzustellen, dass der Workspace bei dir funktioniert, möchte ich dich bitten, schon im Vorfeld die hier beschriebene Installation durchzuführen.

> [!IMPORTANT]  
> Auch wenn du den Workspace schon vor der Schulung installierst, stelle bitte sicher, dass dein Computer auch _während_ des Workshops Zugriff auf das Internet hat. Du solltest in der Lage sein, von GitHub Repositories zu klonen bzw. updates zu machen (git pull) und npm Pakete zu installieren. (Hindernisse können hier zum Beispiel VPNs, Firewalls, Firmen-Proxy oder -Sicherheitsrichtlinien sein)

Auf deinem Computer benötigst Du folgende Software:

- Node.js (mind. Version 18)
- Einen Node Package Manager, am besten pnpm
- Eine Entwicklungsumgebung, mit der du JavaScript bzw. TypeScript entwickeln kannst (z.B. Visual Studio Code, WebStorm oder IntelliJ).

### Voraussetzungen für die Next.js-Anwendung

Wir verwenden die [Version 15-RC von Next.js](https://nextjs.org/blog/next-15-rc).

Die Next.JS-Anwendung benötigt Node.JS (mindestens Version 18). Die Pakete werden mit [pnpm](https://pnpm.io/installation) installiert. Dabei handelt es sich um einen alternativen Package-Manager zur npm, den Du über Node.js selbst aktivieren kannst. Wenn das bei dir nicht funktioniert, sollte auch npm oder yarn funktionieren. Ich habe die Installation aber nur mit pnpm getestet.

Dein Laptop muss mit dem Package Manager in der Lage sein, npm Packages runterzuladen und zu installieren.

Die Next.js-Anwendung läuft auf Port `3000`. Dieser Port muss also bei dir frei sein.

## Installation

### (Optional) Schritt 1: Installation von pnpm

Grundsätzlich sollte die Installation der npm-Packages mit npm und yarn funktionieren.

Ich habe aber mit [pnpm](https://pnpm.io/) getestet. Falls du noch kein pnpm installiert hast, solltest du das jetzt tun. Dazu gibt es [mehrere Wege](https://pnpm.io/installation). Am einfachsten geht es über [Node.js corepacks](https://nodejs.org/docs/latest-v20.x/api/corepack.html).

Dazu führst Du einfach auf der Kommandozeile folgenden Befehl aus (`corepacks` ist Bestandteil von Node.js):

```
corepacks enable
```

### Schritt 2: Installation der npm-Packages

Wir arbeiten im Verzeichnis `workspace`. In diesem Verzeichnis auf der Kommandozeile bitte folgenden Befehl ausführen:

```
pnpm install
```

(Alternative npm oder yarn verwenden)

### Schritt 3: Starten der Next.js-Anwendung

Die Next.js-Anwendung kannst Du ebenfalls im `workspace`-Verzeichnis starten, in dem Du dort das `dev`-Script ausführst:

```
pnpm dev
```

Die Anwendung startet nun und sollte nach kurzer Zeit auf http://localhost:3000 laufen. Wenn du diese URL in deinem Browser öffnest, müsste dort die Meldung `Hello React / Next.js Workshop!` erscheinen.

### Hinweise zum Next.js Cache

Next.js hat ein sehr aggressives Caching eingebaut. Deswegen kann es manchmal sein, dass Du Änderungen nicht sofort siehst. Deswegen hilft es manchmal:

- Im Browser "hard refresh" machen (Cmd+Shift+R bzw. Ctrl+Shift+R bei Firefox z.B.). Dann verwirft Firefox Dateien im Cache.
- Das Verzeichnis `workspace/.next` löschen und Next.js neustarten

Dieses Verhalten wird sich übrigens in [Next.js 15 ändern](https://nextjs.org/blog/next-15-rc#caching-updates), denn dort ist das Caching nicht mehr an allen Stellen per Default eingeschaltet.

## Fragen, Kommentare, Feedback

Wenn Du Fragen oder Probleme hast, sprich mich gerne an.

Wenn Du nach dem Workshop mit mir in Kontakt bleiben möchtest, findest Du hier meine [Kontaktdaten](https://nilshartmann.net/kontakt).

Ich wünsche dir nun viel Spaß in unserem Workshop!
