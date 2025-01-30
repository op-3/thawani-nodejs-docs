"use client";

import { useEffect, useState, use } from "react";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/docs/MDXComponents";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ExamplePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [example, setExample] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExample = async () => {
      try {
        const response = await fetch(
          `/api/docs?slug=${resolvedParams.slug}&type=examples`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch example");
        }
        const data = await response.json();
        setExample(data);
      } catch (error) {
        console.error("Error fetching example:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExample();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-4">Loading...</div>;
  }

  if (!example) {
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose prose-lg">
      <MDXRemote {...example.content} components={MDXComponents} />
    </article>
  );
}
