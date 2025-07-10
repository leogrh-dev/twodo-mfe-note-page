import { useEffect, useRef, useMemo, useState } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

import { ptBr } from '../../infrastructure/i18n/ptBr';
import { uploadFileToApi } from '../../infrastructure/api/upload.api';
import { deleteFileFromApi } from '../../infrastructure/api/delete.api';

interface BlockEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function BlockEditor({ content, onChange }: BlockEditorProps) {
  const initialContent = useMemo(() => {
    try {
      return content ? JSON.parse(content) : undefined;
    } catch {
      return undefined;
    }
  }, [content]);

  const editor = useCreateBlockNote({
    initialContent,
    dictionary: ptBr,
    uploadFile: uploadFileToApi,
  });

  const previousUrls = useRef<Set<string>>(extractUrls(initialContent || []));
  const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);

  useEffect(() => {
    const checkMenus = () => {
      const slashMenu = document.querySelector('.bn-suggestion-menu');
      const toolbar = document.querySelector('.bn-toolbar');
      setIsAnyMenuOpen(!!slashMenu || !!toolbar);
    };

    const observer = new MutationObserver(checkMenus);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    checkMenus();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const unsubscribe = editor.onChange(async () => {
      if (isAnyMenuOpen) return;

      const doc = editor.document;
      onChange(JSON.stringify(doc));

      const currentUrls = extractUrls(doc);
      const removedUrls = [...previousUrls.current].filter(url => !currentUrls.has(url));

      for (const url of removedUrls) {
        try {
          await deleteFileFromApi(url);
        } catch (err) {
          console.error('Erro ao deletar arquivo:', url, err);
        }
      }

      previousUrls.current = currentUrls;
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [editor, onChange, isAnyMenuOpen]);

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

function extractUrls(doc: any[]): Set<string> {
  const urls = new Set<string>();

  const traverse = (node: any) => {
    if (!node) return;

    if (node.props?.url && typeof node.props.url === 'string') {
      urls.add(node.props.url);
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  doc.forEach(traverse);
  return urls;
}