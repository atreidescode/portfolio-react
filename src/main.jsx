import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* Base */
import './styles/base.css';
import './styles/keyframes.css';

/* Layout */
import './styles/background-canvas.css';
import './styles/page-sections.css';
import './styles/hero-section.css';

/* Sections */
import './styles/stack-section.css';
import './styles/projects-section.css';
import './styles/interests-section.css';
import './styles/contact-section.css';

/* Widgets */
import './styles/terminal-widget.css';
import './styles/eye-button-widget.css';
import './styles/scroll-arrow.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
