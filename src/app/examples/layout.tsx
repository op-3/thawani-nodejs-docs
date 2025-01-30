"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Example {
  title: string;
  slug: string;
}

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [examples, setExamples] = useState<Example[]>([]);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const response = await fetch("/api/docs/list?type=examples");
        if (response.ok) {
          const data = await response.json();
          setExamples(data);
        }
      } catch (error) {
        console.error("Error fetching examples:", error);
      }
    };

    fetchExamples();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0 border-r min-h-screen">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Examples</h2>
          <nav>
            <ul className="space-y-2">
              {examples.map((example) => (
                <li key={example.slug}>
                  <Link
                    href={`/examples/${example.slug}`}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      pathname === `/examples/${example.slug}`
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {example.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-1 px-8 py-6">{children}</div>
    </div>
  );
}
