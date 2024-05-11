import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Loader } from './common/components/loader/loader';
import { App } from './app/app';

import '@cloudscape-design/global-styles/index.css';
import './styles/index.css';

const root = document.querySelector('#c');

root &&
  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </StrictMode>,
  );
