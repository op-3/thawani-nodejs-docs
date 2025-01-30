import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";

interface DocFrontMatter {
  title: string;
  description?: string;
  position?: number;
  [key: string]: unknown;
}

export async function getDocBySlug(slug: string, folder: string = "docs") {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(
      process.cwd(),
      "src/content",
      folder,
      `${realSlug}.mdx`
    );
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    });

    return {
      slug: realSlug,
      frontMatter: data as DocFrontMatter,
      content: mdxSource,
    };
  } catch (err) {
    console.error("Failed to load doc:", err);
    throw err;
  }
}

export async function getAllDocs(folder: string = "docs") {
  try {
    const docsDirectory = path.join(process.cwd(), "src/content", folder);
    const files = fs.readdirSync(docsDirectory);

    const docs = files.map((file): DocFrontMatter & { slug: string } => {
      const source = fs.readFileSync(path.join(docsDirectory, file), "utf8");
      const { data } = matter(source);

      return {
        ...(data as DocFrontMatter),
        slug: file.replace(/\.mdx$/, ""),
      };
    });

    return docs.sort((a, b) => (a.position || 0) - (b.position || 0));
  } catch (err) {
    console.error("Failed to list docs:", err);
    return [];
  }
}
