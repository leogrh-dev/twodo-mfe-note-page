import { renderNotePage } from './renderNotePage';

declare global {
  interface Window {
    renderNotePage: typeof renderNotePage;
  }
}

window.renderNotePage = renderNotePage;