import { posts } from "@/app/data/blog-post.json";
import PostCard from "@/app/components/Post";

export default function BlogHome() {
  return (
    <>
      <h1 className="text-xl font-bold">Blog</h1>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </>
  );
}
