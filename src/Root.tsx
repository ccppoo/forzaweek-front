import { ComponentType, StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from '@/theme/Provider';

// import { UseFullWebSocketProvider } from './socket';
// import { mainSocketConfig } from '@/api/globalSocket';

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <QueryClientProvider client={queryClient}>
            {/* <UseFullWebSocketProvider config={mainSocketConfig}> */}
            <HelmetProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </HelmetProvider>
            {/* </UseFullWebSocketProvider> */}
          </QueryClientProvider>
        </CookiesProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
