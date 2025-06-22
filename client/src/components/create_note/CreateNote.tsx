import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import BackButton from '../ui/BackButton';
import "react-mde/lib/styles/css/react-mde-all.css";
import NoteEditor from '../NoteEditor';
import NoteMetaEditor from '../TagEditor';
import { NoteTagProps } from '../../types/GlobalTypes';
import { getNotes, saveNotes } from '../../utils/localstorage';
import { NoteProps } from '../../types/GlobalTypes';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const tagDefault: NoteTagProps = {name: "Select Tag"}
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<NoteTagProps>(tagDefault);
  const [isFocused, setIsFocused] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const navigate = useNavigate();
  
  const setTagDefault = () => {
    setTag(tagDefault);
  }

  const handleSave = () => {
    const notes: NoteProps[] = getNotes()
    const newNote : NoteProps = {
      content: editedContent,
      date: new Date(),
      tag: tag,
      title: title,
    }

    saveNotes([...notes, newNote]);
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm dark:shadow-gray-800/50">
      <div className="flex items-start justify-between mb-6">
        <BackButton />
        
        <div className="flex-1 px-4">
          <div className={`relative ${isFocused ? 'ring-2 ring-blue-500/30' : ''} rounded-lg transition-all`}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter note title..."
              className="w-full text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 py-2 px-3 rounded-lg"
            />
            <div className={`absolute inset-0 -z-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-all ${isFocused ? 'opacity-100' : 'opacity-60'}`}></div>
          </div>
          
        </div>
      </div>

        <div className="flex justify-center">
            <NoteMetaEditor tag={tag} onTagChange={setTag} onDelete={setTagDefault} />
        </div>

      <div className="mt-6">
        <NoteEditor
            content={editedContent} 
            onChange={setEditedContent} 
        />
        <div className='flex justify-end mt-3'>
            <button
              onClick={handleSave}
              disabled={
                tag.name === "Select Tag" ||
                title.trim() === "" ||
                editedContent.trim() === ""
              }
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors 
                ${tag.name === "Select Tag" || title.trim() === "" || editedContent.trim() === ""
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            >
              <CheckIcon className="h-4 w-4" />
              Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;