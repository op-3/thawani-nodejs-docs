"use client";

import { useEffect, useState, use } from "react";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/docs/MDXComponents";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DocPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const response = await fetch(`/api/docs?slug=${resolvedParams.slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        setDoc(data);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-4">Loading...</div>;
  }

  if (!doc) {
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose prose-lg">
      <MDXRemote {...doc.content} components={MDXComponents} />
    </article>
  );
}
