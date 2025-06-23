import { 
  PencilIcon, 
  TrashIcon, 
  ArrowDownTrayIcon, 
  EllipsisVerticalIcon,
  CheckIcon, 
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import "react-mde/lib/styles/css/react-mde-all.css";
import NoteMeta from './NoteMeta';
import NoteContentView from './NoteContentView';
import NoteEditor from '../NoteEditor';
import BackButton from '../ui/BackButton';
import NoteMetaEditor from '../TagEditor';
import { NoteProps } from '../../types/GlobalTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { getNotes, saveNotes } from '../../utils/localstorage';
import { useGlobalState } from '../../store/GlobalStateContext';
import NoteDeletePopUp from '../pop_up/NoteDeletePupUp';

const NoteViewPage = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState<NoteProps>();
  const [editedNote, setEditedNote] = useState<NoteProps>();
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [validationError, setValidationError] = useState("");
  const { setPopUp } = useGlobalState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleSaveWithValidation = () => {
    if (editedNote) {
       if (!editedNote.title.trim()) {
        setValidationError("Judul catatan tidak boleh kosong");
        return;
      }
      
      if (!editedNote.content.trim()) {
        setValidationError("Isi catatan tidak boleh kosong");
        return;
      }

      setValidationError("");
      handleSave();
    }
  };

  const isNoteValid = (note: NoteProps): boolean => {
    const isTitleValid = note.title.trim().length > 0;
    const isContentValid = note.content.trim().length > 0;
    
    return isTitleValid && isContentValid;
  };

  const handleSave = () => {
    if (editedNote) {
      const notes: NoteProps[] = getNotes();

      const updatedNotes = notes.map((n) => 
        n.date === note?.date ? editedNote : n
      );

      saveNotes(updatedNotes);
      setNote(editedNote);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedNote(note);
    setIsEditing(false);
  };

  const onDelete = () => {
    if (note) {
      setPopUp({
        enable: true, 
        children: <NoteDeletePopUp note={note} onDelete={() => {navigate('/')}} />});
    }
  }

  const onDownload = () => {

  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActions]);

  useEffect(() => {
    const curretNote : NoteProps = getNotes().find((cNote : NoteProps) => cNote.date === id);
    if (!curretNote) {
      setNote(undefined);
      setEditedNote(undefined);
    } else {
      setNote(curretNote);
      setEditedNote(curretNote);
    };
    setIsLoading(false);
  }, [id])

  if (isLoading) {
    return (
      <div className="text-center p-10 max-w-3xl mx-auto">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">Memuat catatan...</p>
      </div>
    );
  }

  if (!editedNote || !note) {
    return(
      <div className="text-center p-10 max-w-3xl mx-auto">
        <BackButton />
        <h1 className="text-2xl font-bold text-red-500">404</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Catatan tidak ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="min-h-[98vh] max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800/50 border border-gray-100 dark:border-gray-800 transition-all duration-200">
      <div className='flex justify-between align-center'>
        {!isEditing && <BackButton />}
        <div className="relative">
          <button 
            onClick={() => setShowActions(!showActions)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 
                      dark:text-gray-300 transition-colors ${isEditing ? 'hidden' : ''}`}
            aria-label="Note actions"
          >
            <EllipsisVerticalIcon className="h-5 w-5" />
          </button>
          
          {showActions && !isEditing &&(
            <div 
              ref={actionsRef}
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-150 origin-top-right"
            >
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowActions(false);
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors border-b border-gray-100 dark:border-gray-700"
              >
                <PencilIcon className="h-4 w-4 mr-3 text-green-500" />
                Edit Note
              </button>
              <button
                onClick={() => {
                  onDownload();
                  setShowActions(false);
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors border-b border-gray-100 dark:border-gray-700"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-3 text-green-500" />
                Export Note
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowActions(false);
                }}
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <TrashIcon className="h-4 w-4 mr-3" />
                Delete Note
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 px-4">
          {isEditing ? (
            <input
              value={editedNote.title}
              onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
              className="w-full text-2xl font-bold text-gray-900 dark:text-white text-center bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 pb-2"
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center line-clamp-2 break-words">
              {note.title}
            </h1>
          )}
          
          <div className="mt-2">
            {isEditing ? (
              <div className='flex justify-center align-center'>
                <NoteMetaEditor 
                  tag={editedNote.tag} 
                  onTagChange={(e) => setEditedNote({...editedNote, tag: e})}
                  onDelete={() => {}}
                />
              </div>
            ) : (
              <NoteMeta tag={note.tag} date={note.date} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
        {isEditing ? (
          <div className="space-y-4">
            <NoteEditor 
              content={editedNote.content} 
              onChange={(e) => setEditedNote({...editedNote, content: e})} 
            />
            <div className="flex flex-col items-end gap-3 mt-4">
              {validationError && (
                <span className="text-sm text-red-500 dark:text-red-400 mr-auto animate-pulse">
                  {validationError}
                </span>
              )}
              
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  disabled={!isNoteValid(editedNote)}
                  onClick={handleSaveWithValidation}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors shadow-md ${
                    !isNoteValid(editedNote)
                      ? "bg-gray-400 dark:bg-gray-500 cursor-not-allowed text-gray-600 dark:text-gray-300"
                      : "bg-green-600 hover:bg-green-700 hover:shadow-green-500/20 text-white"
                  }`}
                >
                  <CheckIcon className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
          </div>
          </div>
        ) : (
          <NoteContentView content={note.content} />
        )}
      </div>
    </div>
  );
};

export default NoteViewPage;