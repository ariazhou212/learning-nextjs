// File: scripts/seed.js
import { createClient } from "@vercel/postgres";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { posts } from "../src/app/data/data-post.js";

const client = createClient();
await client.connect();

try {
  // Remove all existing posts
  await client.sql`DELETE FROM posts`;

  // Insert new data
  for (const post of posts) {
    await client.sql`
      INSERT INTO posts (id, title, content, author)
      VALUES (${post.id}, ${post.title}, ${post.content}, ${post.author})
    `;
  }

  console.log("✅ Seeding complete.");
} catch (error) {
  console.error("❌ Seed error:", error);
} finally {
  await client.end();
}
