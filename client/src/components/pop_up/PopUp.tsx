import { useEffect } from 'react';
import { useGlobalState } from '../../store/GlobalStateContext';

interface TagNotePopupProps {
  onClose?: () => void;
}

const PopUp = ({ onClose } : TagNotePopupProps) => {
  const { setPopUp, popUp } = useGlobalState();

  const handleClose = () => {
    setPopUp({children : null, enable : false});

    if (onClose) {
      onClose();
    }
  };
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={handleClose}
        aria-hidden="true"
      />

      <div 
        className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Close popup"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          {popUp.children}
        </div>
      </div>
    </div>
  );
};

export default PopUp;