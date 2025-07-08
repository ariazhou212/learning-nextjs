// File: src/app/blog/posts/[id]/page.tsx

import posts from "@/app/data/blog-post.json";
import PostCard from "@/app/components/Post";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = posts.find((p) => p.id === params.id);

  return (
    <div className="p-6">
      {post ? <PostCard {...post} /> : <p>Post not found</p>}
    </div>
  );
}
