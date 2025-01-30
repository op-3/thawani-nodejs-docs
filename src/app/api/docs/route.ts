import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

interface FrontMatter {
  title: string;
  description?: string;
  position?: number;
  [key: string]: unknown;
}

interface DocContent {
  frontMatter: FrontMatter;
  content: MDXRemoteSerializeResult;
}

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

    const frontMatter = data as FrontMatter;

    if (!frontMatter.title) {
      throw new Error("Document is missing required title field");
    }

    const response: DocContent = {
      frontMatter,
      content: mdxSource,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Failed to fetch document:", err);
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
}
