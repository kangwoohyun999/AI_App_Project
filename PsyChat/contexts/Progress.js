// src/contexts/Progress.js
import React, { createContext, useState } from 'react';

export const ProgressContext = createContext({
  inProgress: false,
  spinner: {
    start: () => {},
    stop: () => {},
  },
});

export const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);

  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };

  return (
    <ProgressContext.Provider value={{ inProgress, spinner }}>
      {children}
    </ProgressContext.Provider>
  );
};
