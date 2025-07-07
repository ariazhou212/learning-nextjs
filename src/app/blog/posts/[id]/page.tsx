import { posts } from "@/app/data/blog-post.json";
import PostCard from "@/app/components/Post";

type Props = {
  params: {
    id: string;
  };
};

export default function BlogPage({ params }: Props) {
  const post = posts.find((post) => post.id === params.id);
  if (!post) {
    return <div className="p-6 text-red-500">Post not found</div>;
  }
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      <PostCard {...post} />
    </div>
  );
}
