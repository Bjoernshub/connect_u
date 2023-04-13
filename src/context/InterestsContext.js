import React, { createContext, useState } from 'react';

const InterestsContext = createContext();

export const InterestsProvider = ({ children }) => {
  const [interests, setInterests] = useState([]);

  const updateInterests = (newInterests) => {
    setInterests(newInterests);
  };

  return (
    <InterestsContext.Provider value={{ interests, updateInterests  }}>
      {children}
    </InterestsContext.Provider>
  );
};

export default InterestsContext;