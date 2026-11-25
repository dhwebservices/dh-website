// Fonts are self-hosted and bundled (25 Nov 2026): Google Fonts through
// Cloudflare came back uncompressed and uncached and blocked the first paint.
import '@fontsource/archivo/latin-600.css'
import '@fontsource/archivo/latin-700.css'
import '@fontsource/archivo/latin-800.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { preloadRoute } from './App'
import { initEditBridge } from './lib/editBridge'

// No-ops unless the page is framed by the portal editor.
initEditBridge()

function render() {
  ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
}

// The prerendered HTML stays on screen while this page's code downloads, so
// the first render is the real page rather than a "Loading…" placeholder.
// A failed chunk still renders: the lazy route retries and shows its fallback.
preloadRoute(window.location.pathname).then(render, render)
