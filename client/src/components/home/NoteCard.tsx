import { XMarkIcon } from '@heroicons/react/24/outline';
import { NoteProps } from '../../types/GlobalTypes';
import { format } from "date-fns";
import { useGlobalState } from '../../store/GlobalStateContext';
import NoteDeletePopUp from '../pop_up/NoteDeletePupUp';
import { useNavigate } from 'react-router-dom';
import TagStyle from '../ui/TagStyle';
import Showdown from 'showdown';
import { useEffect, useState, useMemo } from 'react';

interface NoteCardProp {
  note: NoteProps,
  compact?: boolean,
  onDelete: () => void,
}

const NoteCard = ({ note, compact = true, onDelete }: NoteCardProp) => {
  const time = format(new Date(note.date), "HH:mm");
  const { setPopUp } = useGlobalState();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState('');

  const converter = useMemo(() => new Showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    simpleLineBreaks: true
  }), []);

  useEffect(() => {
    setHtmlContent(converter.makeHtml(note.content));
  }, [note.content, converter]);

  const deletePOpUp = () => {
    setPopUp({ enable: true, children: <NoteDeletePopUp onDelete={onDelete} note={note} /> });
  }

  const viewHandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/view-note/${note.date}`);
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full ${compact ? 'p-3' : 'p-5'}`}>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <TagStyle tag={note.tag} />
          <button 
            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              deletePOpUp();
            }}
          >
            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-800 dark:text-white mt-1`}>{note.title}</h3>
        <div 
          className={`prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 ${compact ? 'text-xs' : 'text-sm'} line-clamp-3 mt-1`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      <div className={`${compact ? 'px-3 py-2' : 'px-4 py-3'} border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/30 mt-2`}>
        <span className={`${compact ? 'text-[11px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>{time}</span>
        <div className="flex gap-1">
          <button 
            className={`${compact ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'} text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
            onClick={viewHandle}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;