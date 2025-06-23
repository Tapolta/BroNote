import { NoteTagProps } from "../../types/GlobalTypes";

const colorMap: Record<string, string> = {
  red: 'bg-red-50/50 text-red-700 ring-red-500/10 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-300/10',
  blue: 'bg-blue-50/50 text-blue-700 ring-blue-500/10 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-300/10',
  green: 'bg-green-50/50 text-green-700 ring-green-500/10 dark:bg-green-950/30 dark:text-green-300 dark:ring-green-300/10',
  yellow: 'bg-yellow-50/50 text-yellow-700 ring-yellow-500/10 dark:bg-yellow-950/30 dark:text-yellow-300 dark:ring-yellow-300/10',
  purple: 'bg-purple-50/50 text-purple-700 ring-purple-500/10 dark:bg-purple-950/30 dark:text-purple-300 dark:ring-purple-300/10',
  pink: 'bg-pink-50/50 text-pink-700 ring-pink-500/10 dark:bg-pink-950/30 dark:text-pink-300 dark:ring-pink-300/10',
};

const TagStyle = ({ tag }: { tag: NoteTagProps }) => {
  const colorClasses = tag.color 
    ? `ring-1 ${colorMap[tag.color]}` 
    : 'bg-gray-50/50 text-gray-700 ring-gray-500/10 dark:bg-gray-900/20 dark:text-gray-300 dark:ring-gray-300/10';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${colorClasses}`}
    >
      {tag.name}
    </span>
  );
};

export default TagStyle;