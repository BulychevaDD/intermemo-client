import { createRoot } from 'react-dom/client';
import { MemoApplication } from './app';

const rootElement = document.getElementById('root')!;

const root = createRoot(rootElement);

root.render(<MemoApplication />);
