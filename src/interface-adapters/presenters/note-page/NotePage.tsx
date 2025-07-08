import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { NoteTitle } from './NoteTitle';
import { BlockEditor } from '../../../frameworks/blocknotejs/BlockEditor';
import type { NotePageProps } from '../../../core/entities/note-page-props';

export function NotePage({ title, content, onTitleChange, onContentChange }: NotePageProps) {
  const [localTitle, setLocalTitle] = useState(title);
  const [contentKey, setContentKey] = useState(() => Date.now());

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  useEffect(() => {
    setContentKey(Date.now());
  }, [content]);

  const debouncedChange = useCallback(
    debounce((value: string) => {
      onTitleChange(value.trim());
    }, 500),
    [onTitleChange]
  );

  const handleTitleChange = (value: string) => {
    setLocalTitle(value);
    debouncedChange(value);
  };

  return (
    <div className="custom-container">
      <NoteTitle value={localTitle} onChange={handleTitleChange} />

      <BlockEditor key={contentKey} content={content} onChange={onContentChange} />
    </div>
  );
}