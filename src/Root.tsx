import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';

// import { UseFullWebSocketProvider } from './socket';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { echoSocketConfig, mainSocketConfig } from '@/api/globalSocket';
import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          {/* <UseFullWebSocketProvider config={mainSocketConfig(111)}>
            <UseFullWebSocketProvider config={echoSocketConfig}> */}
          <HelmetProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </HelmetProvider>
          {/* </UseFullWebSocketProvider>
        </UseFullWebSocketProvider> */}
        </QueryClientProvider>
      </RecoilRoot>
    </StrictMode>,
  );
}

export default render;
