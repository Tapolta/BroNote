import Showdown from "showdown";

interface NoteContentViewProps {
  content: string;
}

const NoteContentView = ({ content }: NoteContentViewProps) => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <div 
      className="prose dark:prose-invert max-w-none dark:text-white"
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
    />
  );
};

export default NoteContentView;