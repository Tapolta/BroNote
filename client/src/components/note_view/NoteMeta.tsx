import { NoteTagProps } from "../../types/GlobalTypes";
import { format } from "date-fns";

interface NoteMetaProps {
  tag: NoteTagProps;
  date: Date | string;
}

const NoteMeta = ({ tag, date }: NoteMetaProps) => {
  const formattedDate = format(
    typeof date === 'string' ? new Date(date) : date,
    'MMM d, yyyy - HH:mm'
  );

  return (
    <div className="flex items-center justify-between mt-3 px-1">
      <span 
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
          tag.color 
            ? `bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-200 hover:bg-${tag.color}-200 dark:bg-${tag.color}-900/30 dark:text-${tag.color}-200 dark:border-${tag.color}-800/50`
            : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        }`}
      >
        {tag.name}
      </span>
      
      <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <svg 
          className="w-3 h-3 mr-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        {formattedDate}
      </span>
    </div>
  );
};

export default NoteMeta;