import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { CenterContainer, Loader } from '@ez/web-ui';
import { App } from './app/app';

import '@cloudscape-design/global-styles/index.css';
import './styles/index.css';

const root = document.querySelector('#c');

root &&
  createRoot(root).render(
    <StrictMode>
      <Suspense
        fallback={
          <CenterContainer>
            <Loader />
          </CenterContainer>
        }
      >
        <App />
      </Suspense>
    </StrictMode>
  );
