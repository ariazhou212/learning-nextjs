// components/Post.tsx
import Link from "next/link";
import { Post } from "../lib/definition";

export default function PostCard({ id, title, content, author }: Post) {
  return (
    <div className="border p-4 rounded-md shadow-sm">
      <Link href={`/posts/${id}`}>
        <h2 className="text-xl font-semibold text-primary hover:underline">
          {title}
        </h2>
      </Link>
      <p className="text-sm text-gray-500">by {author}</p>
      <p className="mt-2 text-gray-700">{content}</p>
    </div>
  );
}
