"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface DocLink {
  title: string;
  slug: string;
  position: number;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [docs, setDocs] = useState<DocLink[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch("/api/docs/list");
        if (response.ok) {
          const data = await response.json();
          setDocs(data);
        }
      } catch (error) {
        console.error("Error fetching doc links:", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="w-64 flex-shrink-0 border-r min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Documentation</h2>
        <nav>
          <ul className="space-y-2">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/docs/${doc.slug}`}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    pathname === `/docs/${doc.slug}`
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
