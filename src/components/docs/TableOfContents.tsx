interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-gray-500 hover:text-gray-900 ${
            item.level === 2 ? "pl-0" : "pl-4"
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
