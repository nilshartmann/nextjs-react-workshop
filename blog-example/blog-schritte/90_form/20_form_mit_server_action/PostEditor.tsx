"use client";

import { saveNewBlogPost } from "@/app/shared/material/add/editor-actions.ts";
import AppLink from "@/app/shared/components/AppLink.tsx";

export default function PostEditor() {
  // VARIANTE "OHNE JS LAUFFÄHIG"
  //
  //  - was geht:
  //    - Ausfüllen
  //    - cancel
  //    - Client-seitige Validierung (nur mit Browser-Mitteln, d.h. kein Styling, kein Realtime)
  //    - Redirect nach erfolgreichem Speichern
  //  - was geht nicht:
  //    - clear
  //    - Zeichenzähler / Real-time Validierung / Real-time enablement
  //    - Disablen des Submit-Buttons während Submit
  //    - Vorschau Blog Post
  //    - Keine Fehlermeldung, wenn Speichern nicht funktioniert
  //  - was könnten wir davon (evtl mit Aufwand) ohne JS umsetzen? 🤔

  return (
    <form action={saveNewBlogPost}>
      <div className={"Container"}>
        <h1>Add Post</h1>
        <label>
          Title
          <input name="title" required={true} maxLength={25} />
        </label>

        <label>
          Body
          <textarea name="body" required={true} minLength={10} />
        </label>

        <AppLink className={"Button"} href={"/posts"}>
          Cancel
        </AppLink>
        <button type={"submit"}>Save</button>
      </div>
    </form>
  );
}
