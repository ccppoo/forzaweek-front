import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { mainSocketConfig } from '@/api/globalSocket';
import ThemeProvider from '@/theme/Provider';

import { UseFullWebSocketProvider } from './socket';

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {/* <UseFullWebSocketProvider config={mainSocketConfig}> */}
          <HelmetProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </HelmetProvider>
          {/* </UseFullWebSocketProvider> */}
        </QueryClientProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
