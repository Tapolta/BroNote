import { NoteTagProps } from "../../types/GlobalTypes";
import { format } from "date-fns";
import TagStyle from "../ui/TagStyle";

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
      <TagStyle tag={tag}/>
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