import { useEffect, useState } from 'react';
import { NoteTitle } from './NoteTitle';
import { BlockEditor } from '../../../frameworks/blocknotejs/BlockEditor';
import type { NotePageProps } from '../../../application/ports/note-storage.port';

export function NotePage({ title, content, onTitleChange, onContentChange }: NotePageProps) {
  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    if (title !== localTitle) {
      setLocalTitle(title);
    }
  }, [title]);

  return (
    <div className="custom-container">
      <NoteTitle
        value={localTitle}
        onChange={setLocalTitle}
        onBlur={() => onTitleChange(localTitle.trim())}
      />
      <BlockEditor content={content} onChange={onContentChange} />
    </div>
  );
}