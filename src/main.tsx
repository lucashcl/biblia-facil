import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { ThemeProvider } from './components/theme-provider.tsx'

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <NuqsAdapter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>,
)
