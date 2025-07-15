// File: src/app/posts/[id]/page.tsx
import { getPosts } from "@/app/lib/data";
import PostCard from "@/app/components/Post";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const posts = await getPosts();
  if (!posts) return <p>Failed to load posts.</p>;
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
