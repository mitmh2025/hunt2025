import React from 'react';
import { createRoot }  from 'react-dom/client';
import { App } from './App';

import "./index.css";

requestIdleCallback(() => {
  const root = createRoot(document.getElementById('master-root'));
  root.render(<App />);
});
