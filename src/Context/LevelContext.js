
import React, { createContext, useState } from 'react';

export const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
    const [completedLevels, setCompletedLevels] = useState([1]); // Initially, only level 1 is available

    const completeLevel = (level) => {
        setCompletedLevels((prevLevels) => [...prevLevels, level]);
    };

    return (
        <LevelContext.Provider value={{ completedLevels, completeLevel, setCompletedLevels }}>
            {children}
        </LevelContext.Provider>
    );
};
