import { NoteProps, NoteTagProps } from "../types/GlobalTypes";

const STORAGE_KEY = {
    notes: "notes",
    tags: "tags"
};

export const saveTags = (tags: NoteTagProps[]) => {
    localStorage.setItem(STORAGE_KEY.tags, JSON.stringify(tags));
};

export const getTags = (): NoteTagProps[] => {
    const raw = localStorage.getItem(STORAGE_KEY.tags);
    return raw ? JSON.parse(raw) : [];
};

export const saveNotes = (notes: NoteProps[]) => {
    localStorage.setItem(STORAGE_KEY.notes, JSON.stringify(notes));
};

export const getNotes = () => {
     const raw = localStorage.getItem(STORAGE_KEY.notes);
    return raw ? JSON.parse(raw) : [];
}
