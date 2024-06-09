"use client";

import { saveNewBlogPost } from "@/app/shared/material/add/editor-actions.ts";
import AppLink from "@/app/shared/components/AppLink.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Post from "@/app/shared/material/Post.tsx";

const PostEditorSchema = z.object({
  title: z.string().min(1).max(25),
  body: z.string().min(10),
});

type IPostEditorSchema = z.infer<typeof PostEditorSchema>;

export default function PostEditor() {
  // Diskussion, wie react-hook-form mit useActionState und anderen neuen Hooks aus React 19 arbeiten könnte:
  //  - https://github.com/orgs/react-hook-form/discussions/11832
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<IPostEditorSchema>({
    resolver: zodResolver(PostEditorSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const currentData = watch();

  return (
    <form onSubmit={handleSubmit((d) => saveNewBlogPost(d))}>
      <div className={"Container"}>
        <h1>Add Post</h1>
        <label>
          Title
          <input {...register("title")} disabled={isSubmitting} />
        </label>
        {errors.title && <p>Please fill title correctly</p>}

        <label>
          Body
          <textarea {...register("body")} disabled={isSubmitting} />
        </label>
        {errors.body && <p>Please fill body correctly</p>}

        <AppLink className={"Button"} href={"/posts"}>
          Cancel
        </AppLink>
        <button type={"submit"} disabled={isSubmitting || !isValid}>
          Save
        </button>
      </div>
      <div className={"Container PostEditorPreview"}>
        <h2>Preview: Your new Post</h2>
        <Post post={currentData} />
      </div>
    </form>
  );
}
