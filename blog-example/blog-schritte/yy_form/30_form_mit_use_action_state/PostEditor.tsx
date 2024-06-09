"use client";

import {
  PostEditorFormState,
  saveNewBlogPost,
} from "@/app/shared/material/add/editor-actions.ts";
import AppLink from "@/app/shared/components/AppLink.tsx";
import { useActionState } from "react";
import Message from "@/app/shared/components/Message.tsx";
const initialState: PostEditorFormState = {
  error: null,
};
export default function PostEditor() {
  const [formState, submitAction, isPending] = useActionState(
    saveNewBlogPost,
    initialState,
  );

  // VARIANTE "OHNE JS LAUFFÄHIG"
  //
  //  - was geht:
  //    - Ausfüllen
  //    - cancel
  //    - Client-seitige Validierung (nur mit Browser-Mitteln, d.h. kein Styling, kein Realtime)
  //    - Redirect nach erfolgreichem Speichern
  //    - Fehlermeldung, wenn Speichern nicht funktioniert
  //  - was geht nicht:
  //    - clear
  //    - Zeichenzähler / Real-time Validierung / Real-time enablement
  //    - Disablen des Submit-Buttons während Submit
  //    - Vorschau Blog Post

  //  - was könnten wir davon (evtl mit Aufwand) ohne JS umsetzen? 🤔

  return (
    <form action={submitAction}>
      <div className={"Container"}>
        <h1>Add Post</h1>
        <label>
          Title
          <input
            name="title"
            defaultValue={formState.title}
            required={true}
            maxLength={25}
            disabled={isPending}
          />
        </label>

        <label>
          Body
          <textarea
            name="body"
            defaultValue={formState.body}
            required={true}
            minLength={10}
            disabled={isPending}
          />
        </label>

        <AppLink className={"Button"} href={"/posts"}>
          Cancel
        </AppLink>
        <button type={"submit"} disabled={isPending}>
          Save
        </button>
        {!!formState.error && <Message msg={"Saving failed"} type={"error"} />}
      </div>
    </form>
  );
}
