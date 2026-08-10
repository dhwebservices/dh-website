import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initEditBridge } from './lib/editBridge'

// No-ops unless the page is framed by the portal editor.
initEditBridge()

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
