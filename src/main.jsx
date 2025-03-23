import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { App } from './components/App/App'
import { AppProvider } from './components/App/AppContext'
import {HashRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
)