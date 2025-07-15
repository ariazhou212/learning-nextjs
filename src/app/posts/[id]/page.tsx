// File: src/app/posts/[id]/page.tsx
import { getPosts } from "@/app/lib/data";
import PostCard from "@/app/components/Post";
import { notFound } from "next/navigation";
import { Post } from "@/app/lib/definition";

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const posts: Post[] = (await getPosts()) ?? [];
  const params = await props.params;
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6">
      <PostCard {...post} />
    </div>
  );
}
