"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Example {
  title: string;
  description: string;
  slug: string;
}

export default function ExamplesPage() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const response = await fetch("/api/docs/list?type=examples");
        if (!response.ok) {
          throw new Error("Failed to fetch examples");
        }
        const data = await response.json();
        setExamples(data);
      } catch (error) {
        console.error("Error fetching examples:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamples();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-6">
          {[1, 2].map((n) => (
            <div key={n} className="border rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Integration Examples</h1>

      <div className="grid gap-6">
        {examples.map((example) => (
          <div key={example.slug} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{example.title}</h2>
            <p className="text-gray-600 mb-4">{example.description}</p>
            <Link
              href={`/examples/${example.slug}`}
              className="text-blue-500 hover:text-blue-600 inline-flex items-center"
            >
              View Example
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
