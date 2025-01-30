import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";

export async function getDocBySlug(slug: string) {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(
      process.cwd(),
      "src/content/docs",
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
      frontMatter: data,
      content: mdxSource,
    };
  } catch (error) {
    throw new Error(`Failed to load doc: ${error.message}`);
  }
}

export async function getAllDocs() {
  try {
    const docsDirectory = path.join(process.cwd(), "src/content/docs");
    const files = fs.readdirSync(docsDirectory);

    const docs = files.map((file) => {
      const source = fs.readFileSync(path.join(docsDirectory, file), "utf8");
      const { data } = matter(source);

      return {
        ...data,
        slug: file.replace(/\.mdx$/, ""),
      };
    });

    return docs.sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
  } catch (error) {
    return [];
  }
}
