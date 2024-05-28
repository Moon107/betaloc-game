import React, { useEffect } from 'react';
import "../PreLoader/PreLoader.css";
import { preLoaderAnim } from '../../animations';

export function PreLoader() {
    useEffect(() => {
        preLoaderAnim()

    }, [])
    return <>
    <div className="preLoader">
        <div className="texts-container">
            <span>Starting the Game.....</span>
            
        </div>
    </div>
    </>
}