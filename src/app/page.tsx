import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">
        Thawani Payment Gateway Library
      </h1>
      <p className="text-xl mb-8">
        A simple yet powerful API for integrating Thawani payment gateway in
        Node.js applications
      </p>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Link
          href="/docs/getting-started"
          className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Get Started</h2>
          <p>Learn how to integrate Thawani into your project</p>
        </Link>

        <Link
          href="/examples"
          className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Examples</h2>
          <p>Explore practical integration examples</p>
        </Link>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold">TypeScript Support</h3>
            <p>Fully written in TypeScript with built-in types</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Promise-based API</h3>
            <p>Easy handling of asynchronous operations</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Error Handling</h3>
            <p>Comprehensive and clear error management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
