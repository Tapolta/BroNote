import { useState, useRef, useEffect } from 'react';
import { PlusIcon, DocumentTextIcon, TagIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../store/GlobalStateContext';
import TagPopUp from '../pop_up/TagPopUp';

const AddMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setPopUp } = useGlobalState();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50" ref={menuRef}>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-900/50 overflow-hidden border border-gray-100 dark:border-gray-700">
          <button
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              setIsOpen(false);
              navigate("/create-note");
            }}
          >
            <DocumentTextIcon className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />
            <span>New Note</span>
          </button>
          <button
            className="flex items-center w-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setPopUp({children: <TagPopUp />, enable : true});
            }}
          >
            <TagIcon className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />
            <span>Tag</span>
          </button>
        </div>
      )}

      <button
        className={`p-2 bg-green-600 dark:bg-green-700 text-white rounded-full shadow-lg dark:shadow-gray-900/50 transition-all duration-300 ease-in-out
          flex items-center justify-center group ${isOpen ? 'bg-green-700 dark:bg-green-600 scale-105' : 'hover:bg-green-700 dark:hover:bg-green-600 hover:shadow-xl hover:scale-105'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <PlusIcon className={`h-7 w-7 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'group-hover:rotate-90'}`} />
        <span
          className={`opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto
          transition-all duration-300 ease-in-out
          absolute right-full whitespace-nowrap bg-green-600 dark:bg-green-700 px-4 py-2 rounded-lg mr-3 shadow-md
          text-sm font-semibold pointer-events-none ${isOpen ? 'hidden' : ''}`}
        >
          Add
        </span>
      </button>
    </div>
    
  );
};

export default AddMenu;