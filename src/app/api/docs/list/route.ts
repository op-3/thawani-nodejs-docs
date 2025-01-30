import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "docs";

  try {
    const directory = path.join(process.cwd(), "src/content", type);
    const files = fs.readdirSync(directory);

    const items = files.map((file) => {
      const source = fs.readFileSync(path.join(directory, file), "utf8");
      const { data } = matter(source);

      return {
        ...data,
        slug: file.replace(/\.mdx$/, ""),
      };
    });

    return NextResponse.json(
      items.sort((a: any, b: any) => (a.position || 0) - (b.position || 0))
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to list ${type}` },
      { status: 500 }
    );
  }
}
