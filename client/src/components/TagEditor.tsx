import { CheckIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState } from '../store/GlobalStateContext';
import TagPopUp from './pop_up/TagPopUp';
import { NoteTagProps } from '../types/GlobalTypes';
import { getTags } from '../utils/localstorage';

interface TagEditorProp {
  tag: NoteTagProps;
  onTagChange: (tag: NoteTagProps) => void;
  onDelete: () => void;
}

const TagEditor = ({ tag, onTagChange, onDelete }: TagEditorProp) => {
  const [tags, setTags] = useState<NoteTagProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {setPopUp} = useGlobalState();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tagSelectHandle = () => {
    setTags(getTags());
    setIsOpen(!isOpen);
  }

  const showTagPopUp = () => {
    setPopUp({enable: true, children : <TagPopUp onDelete={onDelete}/>})
  }

  const getTagColorClasses = () => {
    let color = 'gray';
    if (tag.color) {
      color = tag.color;
    }

    switch (color) {
      case 'red':
        return 'bg-red-50/50 text-red-700 ring-red-500/10 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-300/10';
      case 'blue':
        return 'bg-blue-50/50 text-blue-700 ring-blue-500/10 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-300/10';
      case 'green':
        return 'bg-green-50/50 text-green-700 ring-green-500/10 dark:bg-green-950/30 dark:text-green-300 dark:ring-green-300/10';
      case 'yellow':
        return 'bg-yellow-50/50 text-yellow-700 ring-yellow-500/10 dark:bg-yellow-950/30 dark:text-yellow-300 dark:ring-yellow-300/10';
      case 'purple':
        return 'bg-purple-50/50 text-purple-700 ring-purple-500/10 dark:bg-purple-950/30 dark:text-purple-300 dark:ring-purple-300/10';
      case 'pink':
        return 'bg-pink-50/50 text-pink-700 ring-pink-500/10 dark:bg-pink-950/30 dark:text-pink-300 dark:ring-pink-300/10';
      default:
        // Default gray for undefined colors
        return 'bg-gray-50/50 text-gray-700 ring-gray-500/10 dark:bg-gray-900/20 dark:text-gray-300 dark:ring-gray-300/10';
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <div className="relative" ref={dropdownRef}>
       <button
          onClick={tagSelectHandle}
          className={`px-3 py-1 text-sm font-medium rounded-md ring-1 
            transition-all duration-200 ease-out ${getTagColorClasses()} 
            hover:scale-[1.03] hover:shadow-sm active:scale-100 active:shadow-none flex 
            items-center gap-1.5`}
        >
          {tag.name}
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-400 overflow-hidden"
          >
             {tags.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onTagChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors
                  ${tag.name === option.name
                    ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
              >
                {option.name}
                {tag.name === option.name && <CheckIcon className="w-4 h-4" />}
              </button>
            ))}

            {tags.length === 0 && <p className='text-center text-sm'>No Tags Available</p>}
          </motion.div>
        )}
      </div>
      
      <div className="relative group">
        <button 
          onClick={showTagPopUp}
          className="p-1.5 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm
            hover:from-green-600 hover:to-green-700 hover:shadow-md
            active:scale-95 transition-all duration-150
            flex items-center justify-center"
          aria-label="Add new tag"
        >
          <PlusIcon className='w-5 h-5' />
        </button>
        
        <div className="absolute z-20 top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 
            text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            whitespace-nowrap pointer-events-none">
            Add new tag
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default TagEditor;