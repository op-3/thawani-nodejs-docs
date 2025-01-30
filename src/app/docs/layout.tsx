import Sidebar from "@/components/layout/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 px-8 py-6">{children}</div>
    </div>
  );
}
