import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  title: string;
  message: string;
  duration?: number;
  show: boolean;
  onClose: () => void;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

const Alert = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  show,
  onClose,
  confirmText = 'Confirm',
  onConfirm,
  cancelText = 'Cancel',
  onCancel,
}: AlertProps) => {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const alertConfig = {
    success: {
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
    },
    error: {
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
    },
    warning: {
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
    },
    info: {
      icon: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
    },
  };

  const { icon, bg, border, text } = alertConfig[type];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose}></div>
        
        <div className={`transform overflow-hidden rounded-lg ${bg} ${border} border px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}>
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
              {icon}
            </div>
            
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className={`text-lg font-medium ${text}`}>{title}</h3>
              <div className="mt-2">
                <p className={`text-sm ${text}`}>{message}</p>
              </div>
            </div>
          </div>
          
          {(onConfirm || onCancel) && (
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              {onConfirm && (
                <button
                  type="button"
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm sm:ml-3 sm:w-auto sm:text-sm ${
                    type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                    type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                    type === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' :
                    'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={onConfirm}
                >
                  {confirmText}
                </button>
              )}
              
              {onCancel && (
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onCancel}
                >
                  {cancelText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;