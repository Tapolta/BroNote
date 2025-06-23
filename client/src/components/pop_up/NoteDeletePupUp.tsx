import { useGlobalState } from "../../store/GlobalStateContext";
import { NoteProps } from "../../types/GlobalTypes";
import { getNotes, saveNotes } from "../../utils/localstorage";
import TagStyle from "../ui/TagStyle";

interface NoteDeletePopUpProps {
    onDelete: () => void,
    note: NoteProps
}

const MAX_CONTENT_LENGTH = 120;

const NoteDeletePopUp = ({ onDelete, note }: NoteDeletePopUpProps) => {
    const { setPopUp } = useGlobalState();

    const closePopUp = () => {
        setPopUp({enable: false, children: null});
    }

    const deleteHandle = () => {
        const notes = getNotes();
        const updatedNotes = notes.filter((new_note: NoteProps) => new_note.date !== note.date);
        saveNotes(updatedNotes);
        closePopUp();
        onDelete();
    }

    const truncateContent = (text: string, maxLength: number) => {
        if (!text) return "No content";
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    };

    const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="p-6 max-w-md rounded-xl bg-white shadow-xl dark:bg-gray-800 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                Confirm Deletion
            </h3>
            
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {note.title || "Untitled Note"}
                    </h4>
                    <span className="px-2 py-1 text-xs rounded-full" >
                          <TagStyle tag={note.tag}/>
                    </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 whitespace-pre-line">
                    {truncateContent(note.content, MAX_CONTENT_LENGTH)}
                </p>
                
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {formattedDate}
                </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-6 text-center">
                Are you sure you want to delete this note?
            </p>
            
            <div className="flex justify-center space-x-4">
                <button
                    onClick={closePopUp}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    Cancel
                </button>
                <button
                    onClick={deleteHandle}
                    className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 dark:hover:bg-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-sm hover:shadow-md"
                >
                    Delete Note
                </button>
            </div>
        </div>
    )
}

export default NoteDeletePopUp;