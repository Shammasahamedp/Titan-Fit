import "./api/interceptor.ts"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './reduxStore/store.ts'
import {GoogleOAuthProvider} from "@react-oauth/google"


const CLIENT_ID =import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <GoogleOAuthProvider clientId={CLIENT_ID}>
   <Provider store={store}>
    <App />
    </Provider>
   </GoogleOAuthProvider>
  </StrictMode>,
)
