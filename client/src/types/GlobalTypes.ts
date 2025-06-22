export interface NoteTagProps {
    name: string,
    color?: string,
}

export interface NoteProps {
  title: string;
  content: string;
  tag: NoteTagProps;
  date: Date | string;
}