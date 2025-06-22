import { format } from 'date-fns';
import { NoteProps } from '../types/GlobalTypes';

export const groupNotesByDate = (
  notes: NoteProps[]
): [string, NoteProps[]][] => {
  const groups: Record<string, NoteProps[]> = {};

  notes.forEach((note) => {
    const dateKey = format(new Date(note.date), 'yyyy-MM-dd');
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(note);
  });

  return Object.entries(groups).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );
};
