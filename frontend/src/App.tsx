import { BrowserRouter } from 'react-router-dom';

import { Routes } from '@frontend/Routes';
import { ChakraProvider, theme } from '@frontend/shared/design-system';
import { ScrollToTop } from '@frontend/shared/navigation';
import { EnhancedApolloProvider } from '@frontend/utils/apollo.tsx';

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <EnhancedApolloProvider>
          <ScrollToTop />
          <Routes />
        </EnhancedApolloProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}
