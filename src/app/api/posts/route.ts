// File: src/app/api/posts/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth.config";

// Helper: generate a 5-character random ID like "x83b2"
function generateId(length = 5) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export async function POST(req: Request) {
  try {
    const { title, author, content } = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Not signed in" }, { status: 401 });
    }

    if (!title || !author || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const id = generateId();

    await sql`
      INSERT INTO posts (id, title, author, content)
      VALUES (${id}, ${title}, ${author}, ${content});
    `;

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("❌ DB insert error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const result = await sql`SELECT * FROM posts ORDER BY created_at DESC`;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error("DB fetch error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
