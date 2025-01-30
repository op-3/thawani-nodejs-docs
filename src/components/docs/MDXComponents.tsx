"use client";

import { CodeBlock } from "./CodeBlock";

export const MDXComponents = {
  pre: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  },
  code: ({ className, children }: { className?: string; children: string }) => {
    const language = className?.replace("language-", "");
    return <CodeBlock language={language}>{children.trim()}</CodeBlock>;
  },
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6" {...props} />,
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6" {...props} />
  ),
  p: (props: any) => <p className="mb-4 text-gray-600" {...props} />,
  ul: (props: any) => <ul className="mb-4 list-disc list-inside" {...props} />,
  ol: (props: any) => (
    <ol className="mb-4 list-decimal list-inside" {...props} />
  ),
  li: (props: any) => <li className="mb-2" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      {...props}
    />
  ),
};
