import { CodeBlock } from "./CodeBlock";

interface MDXProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const MDXComponents = {
  pre: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  },
  code: ({ className, children }: MDXProps) => {
    const language = className?.replace("language-", "");
    return <CodeBlock language={language}>{children as string}</CodeBlock>;
  },
  h1: (props: MDXProps) => (
    <h1 className="text-4xl font-bold mb-6" {...props} />
  ),
  h2: (props: MDXProps) => (
    <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />
  ),
  h3: (props: MDXProps) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6" {...props} />
  ),
  p: (props: MDXProps) => <p className="mb-4 text-gray-600" {...props} />,
  ul: (props: MDXProps) => (
    <ul className="mb-4 list-disc list-inside" {...props} />
  ),
  ol: (props: MDXProps) => (
    <ol className="mb-4 list-decimal list-inside" {...props} />
  ),
  table: (props: MDXProps) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  th: (props: MDXProps) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: MDXProps) => (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      {...props}
    />
  ),
};
