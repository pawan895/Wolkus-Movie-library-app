import * as React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom'; // Or HashRouter

import App from './App';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);



root.render(
  <React.StrictMode>
    <Router>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

      <CssBaseline />
      
      
      <App />
    </ThemeProvider>
    </Router>
  </React.StrictMode>,
);
