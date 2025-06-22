import ReactMde from "react-mde";
import Showdown from "showdown";
import { useState } from 'react';


interface NoteEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const NoteEditor = ({ content, onChange }: NoteEditorProps) => {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <div className="space-y-4">
      <ReactMde
        value={content}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={300}
        heightUnits="px"
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
      />
    </div>
  );
};

export default NoteEditor;