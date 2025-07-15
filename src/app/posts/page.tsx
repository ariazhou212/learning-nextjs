import PostCard from "../components/Post";
import { connectToDB, getPosts } from "../lib/data";
import Link from "next/link";
import { auth } from "../../../auth.config";

export default async function Page() {
  const client = await connectToDB();
  const posts = await getPosts();
  const session = await auth();

  return (
    <>
      {client && <p className="text-green-800">Connected to database</p>}
      <h1 className="text-xl font-bold">Post</h1>
      {posts?.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
      {session?.user && (
        <Link href="/posts/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + New Post
          </button>
        </Link>
      )}
    </>
  );
}
