import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

interface DocItem {
  title: string;
  description?: string;
  position: number;
  slug: string;
  [key: string]: unknown;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "docs";

  try {
    const directory = path.join(process.cwd(), "src/content", type);
    const files = fs.readdirSync(directory);

    const items = files.map((file): DocItem => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const { data } = matter(source);

      return {
        ...(data as DocItem),
        slug: file.replace(/\.mdx$/, ""),
      };
    });

    return NextResponse.json(
      items.sort((a, b) => (a.position || 0) - (b.position || 0))
    );
  } catch (err) {
    console.error(`Failed to list ${type}:`, err);
    return NextResponse.json(
      { error: `Failed to list ${type}` },
      { status: 500 }
    );
  }
}
