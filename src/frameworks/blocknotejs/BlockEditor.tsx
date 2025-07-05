import { useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { ptBr } from '../../infrastructure/i18n/ptBr';

interface BlockEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function BlockEditor({ content, onChange }: BlockEditorProps) {
  const initialContent = content ? JSON.parse(content) : undefined;

  const editor = useCreateBlockNote({
    initialContent,
    dictionary: ptBr,
  });

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      onChange(JSON.stringify(editor.document));
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [editor, onChange]);

  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar
      slashMenu
      sideMenu
      emojiPicker
      filePanel
      tableHandles
    />
  );
}