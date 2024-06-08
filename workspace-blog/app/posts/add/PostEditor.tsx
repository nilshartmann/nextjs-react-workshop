"use client";

import PageHeader from "@/app/components/PageHeader.tsx";
import Message from "@/app/components/Message.tsx";
import Post from "@/app/posts/[postId]/Post.tsx";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { INewBlogPost } from "@/app/types.ts";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import { savePost } from "@/app/posts/add/editor-actions.ts";

export default function PostEditor() {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
      await savePost({ title, body });

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
      </div>
      <div className={"Container PostEditorPreview"}>
        <h2>Preview: Your new Post</h2>
        <Post post={{ title, body }} />
      </div>
    </div>
  );
}
