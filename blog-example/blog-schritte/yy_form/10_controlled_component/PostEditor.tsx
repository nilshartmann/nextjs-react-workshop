"use client";

import Message from "@/app/shared/components/Message.tsx";
import Post from "@/app/shared/material/Post.tsx";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/app/shared/components/LoadingIndicator.tsx";
import { saveNewBlogPost } from "@/app/shared/material/add/editor-actions.ts";

export default function PostEditor() {
  // VARIANTE NUR MIT JS LAUFFÄHIG
  //
  //  - was geht:
  //    - Ausfüllen
  //    - cancel
  //    - Client-seitige Validierung (nur mit Browser-Mitteln, d.h. kein Styling, kein Realtime)
  //    - Redirect nach erfolgreichem Speichern
  //    - clear
  //    - Zeichenzähler / Real-time Validierung / Real-time enablement
  //    - Disablen des Submit-Buttons während Submit
  //    - Vorschau Blog Post
  //    - Keine Fehlermeldung, wenn Speichern nicht funktioniert
  //      - Können wir die Fehlermeldung wieder entfernen, sobald sich eine Eingabe geändert hat? 🤔

  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const clearDisabled = (!title && !body) || pending;
  const saveButtonDisabled = !title || !body || pending;

  const handleClear = () => {
    setTitle("");
    setBody("");
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleSave = () => {
    startTransition(async () => {
      // 'saveNewBlogPost' kann hier CLIENT oder SERVER Action sein
      const result = await saveNewBlogPost(title, body);
      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/posts");
    });
  };

  return (
    <div>
      <div className={"Container"}>
        <h1>Add Post</h1>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
        {title ? (
          <Message type="info" msg="Title correctly filled" />
        ) : (
          <Message type="error" msg="Please enter a title" />
        )}

        <label>
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
          />
        </label>
        {body ? (
          <Message type="info" msg="Body correctly filled" />
        ) : (
          <Message msg="Please enter a body" />
        )}

        <button disabled={clearDisabled} onClick={handleClear}>
          Clear
        </button>
        <button onClick={handleCancel}>Cancel</button>
        <button disabled={saveButtonDisabled} onClick={handleSave}>
          {pending ? <LoadingIndicator secondary /> : "Save Post"}
        </button>
        {!!error && <Message msg={error} type={"error"} />}
      </div>
      <div className={"Container PostEditorPreview"}>
        <h2>Preview: Your new Post</h2>
        <Post post={{ title, body }} />
      </div>
    </div>
  );
}
