import '../index.css';
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { NotePage } from '../interface-adapters/presenters/note-page/NotePage';
import type { NotePageProps } from '../core/entities/note-page-props';

const roots = new Map<HTMLElement, Root>();

export function renderNotePage(container: HTMLElement, props: NotePageProps) {
  let root = roots.get(container);

  if (!root) {
    root = createRoot(container);
    roots.set(container, root);
  }

  root.render(
    <React.StrictMode>
      <NotePage {...props} />
    </React.StrictMode>
  );
}