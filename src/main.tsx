import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { NotePage } from './interface-adapters/presenters/note-page/NotePage';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotePage
      title="Nova página"
      content=""
      onTitleChange={(t) => console.log("Título:", t)}
      onContentChange={(c) => console.log("Conteúdo:", c)}
    />
  </StrictMode>,
)
