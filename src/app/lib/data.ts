import { createClient } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { Post } from "./definition";

export async function connectToDB() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      return client;
    }
  } catch (error) {
    console.error("What error", error);
  }
}

export async function getPosts() {
  try {
    unstable_noStore();
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await sql`select * from posts`;
    console.log(data.rows);
    return data.rows as Post[];
  } catch (error) {
    console.error("What error", error);
  }
}
