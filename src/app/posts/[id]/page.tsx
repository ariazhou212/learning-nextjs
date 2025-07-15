// File: src/app/posts/[id]/page.tsx
import { getPosts } from "@/app/lib/data";
import PostCard from "@/app/components/Post";
import { notFound } from "next/navigation";
import { Post } from "@/app/lib/definition";

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const posts: Post[] = (await getPosts()) ?? [];
  // const params = await props.params;
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="p-6">
      <PostCard {...post} />
    </div>
  );
}
