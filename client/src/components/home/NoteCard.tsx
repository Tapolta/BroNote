import { XMarkIcon } from '@heroicons/react/24/outline';
import { NoteProps } from '../../types/GlobalTypes';
import { format } from "date-fns";
import { useGlobalState } from '../../store/GlobalStateContext';
import NoteDeletePopUp from '../pop_up/NoteDeletePupUp';
import { useNavigate } from 'react-router-dom';

interface NoteCardProp {
  note: NoteProps,
  compact? : boolean,
  onDelete: () => void,
}

const NoteCard = ({ note, compact = true, onDelete } : NoteCardProp) => {
  const time = format(new Date(note.date), "HH:mm");
  const { setPopUp } = useGlobalState();
  const navigate = useNavigate();
  const getTagColors = () => {
    // switch (tag) {
    //   case 'Work':
    //     return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    //   case 'Personal':
    //     return 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
    //   case 'Important':
    //     return 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
    //   case 'Ideas':
    //     return 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    //   default:
    //     return 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    // }
    let color = 'gray';
    if (note.tag.color) {
      color = note.tag.color;
    }
    return `bg-${color}-50 dark:bg-gray-800 text-${color}-700 dark:text-gray-300 border-${color}-200 dark:border-${color}-700`; 
  };

  const deletePOpUp = () => {
    setPopUp({enable: true, children: <NoteDeletePopUp onDelete={onDelete} note={note} />});
  }

  const viewHandle = () => {
    navigate(`view-note/${note.date}`);
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full ${compact ? 'p-3' : 'p-5'}`}>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className={`px-2 py-0.5 text-[11px] sm:text-xs font-semibold rounded-full ${getTagColors()} border`}>
            {note.tag.name}
          </span>
          <button className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={deletePOpUp}>
            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-800 dark:text-white mt-1`}>{note.title}</h3>
        <p className={`text-gray-600 dark:text-gray-400 ${compact ? 'text-xs' : 'text-sm'} line-clamp-3 mt-1`}>
          {note.content}
        </p>
      </div>

      <div className={`${compact ? 'px-3 py-2' : 'px-4 py-3'} border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/30 mt-2`}>
        <span className={`${compact ? 'text-[11px]' : 'text-xs'} text-gray-500 dark:text-gray-400`}>{time}</span>
        <div className="flex gap-1">
          <button className={`${compact ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'} text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
            onClick={viewHandle}>
            View
          </button>
          <button className={`${compact ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'} text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors`}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;