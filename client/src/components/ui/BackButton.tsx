import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BackButton = () => {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (window.history.length > 1) {
      try {
        const previousPageUrl = document.referrer;
        const currentOrigin = window.location.origin;
        
        if (previousPageUrl && previousPageUrl.startsWith(currentOrigin)) {
          setCanGoBack(true);
        } else {
          setCanGoBack(false);
        }
      } catch (error) {
        setCanGoBack(window.history.length > 2);
      }
    }
  }, []);

  const onBack = () => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button 
      onClick={onBack}
      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <span className="ml-2 hidden sm:inline">Back</span>
    </button>
  );
};

export default BackButton;