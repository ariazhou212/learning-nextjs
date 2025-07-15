"use client"; // Marks this component as a Client Component in Next.js App Router

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For redirecting after submit
import { getSession } from "next-auth/react"; // Get user session info
import { User } from "next-auth"; // Type definition for user session

// Main component for creating a new post
export default function NewPostPage() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    id: "", // Optional ID field (not used yet)
    title: "", // Post title
    content: "", // Post content
  });

  // Track loading state while generating content from OpenAI
  const [generating, setGenerating] = useState(false);

  // Store logged-in user session
  const [user, setUser] = useState<User | null>(null);

  // Router to programmatically redirect user
  const router = useRouter();

  // Update form state when user types in input/textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Dynamically update the correct field in formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler to POST form data to /api/posts
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission reload

    // Prevent submit if AI is still generating
    if (generating) return;

    // Prepare payload with optional author
    const payload = {
      ...formData,
      author: user?.name || "Anonymous",
    };

    // Basic validation
    if (!payload.title || !payload.content) {
      alert("Title and content are required.");
      return;
    }

    try {
      // Submit to backend API route
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Handle backend error
      if (!res.ok) {
        const error = await res.json();
        console.error("❌ Submission failed:", error);
        alert("Failed to submit: " + (error?.error || "Unknown error"));
        return;
      }

      // Clear form and redirect to post list
      setFormData({ id: "", title: "", content: "" });
      router.push("/posts");
    } catch (err) {
      console.error("❌ Submit error:", err);
    }
  };

  // Use OpenAI API to generate content based on the title
  const generateContent = async () => {
    if (!formData.title || generating) return;

    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title }),
      });

      const data = await res.json();
      const generated = data.choices?.[0]?.message?.content || "";
      setFormData((prev) => ({ ...prev, content: generated }));
    } catch (err) {
      console.error("AI generation failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  // Check user session on component mount
  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user || null);

      // Redirect unauthenticated users to /posts
      if (!session?.user) router.push("/posts");
    });
  }, [router]);

  // Render the post creation form
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      {/* Title input field */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="block w-full border p-2"
        required
      />

      {/* Content textarea */}
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        className="block w-full border p-2"
        required
      />

      {/* AI generation status indicator */}
      {generating && <p className="text-purple-700 my-1">Generating...</p>}

      {/* Generate with AI button */}
      <button
        type="button"
        disabled={generating}
        onClick={generateContent}
        className="bg-blue-400 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {generating ? "Generating..." : "Generate With AI"}
      </button>

      {/* Submit button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={generating}
      >
        Submit
      </button>
    </form>
  );
}
