import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") || "docs";

  try {
    const directory = path.join(process.cwd(), "src/content", type);
    const fullPath = path.join(directory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content);

    return NextResponse.json({
      frontMatter: data,
      content: mdxSource,
    });
  } catch (error) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}
