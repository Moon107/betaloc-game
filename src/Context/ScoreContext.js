import React, { createContext, useState } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const addScore = (newScore) => {
    setScore(newScore);
    setTotalScore((prevTotal) => prevTotal + newScore); // Accumulate total score
  };

  return (
    <ScoreContext.Provider value={{ score, setScore, totalScore, addScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

