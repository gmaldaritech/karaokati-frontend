import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { AuthProvider } from '@/hooks/useAuth'
import Pages from './pages/index.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>  {/* ← AGGIUNTO */}
      <Pages />
      <Analytics 
        beforeSend={(event) => {
          const publicPages = [
            '/',
            '/home',
            '/register',
            '/login',
            '/terms',
            '/support',
            '/suggestions',
            '/about-us'
          ];
          
          const currentPath = new URL(event.url).pathname;
          
          if (publicPages.includes(currentPath)) {
            return event;
          }
          
          return null;
        }}
      />
    </AuthProvider>  {/* ← AGGIUNTO */}
  </React.StrictMode>,
)