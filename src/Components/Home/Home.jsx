import React, { useEffect, useRef, useState } from 'react';
// import homeImage from "../../images/Artboard.png";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import coinImage from "../../images/CoinAnimation2.gif";
import backgroundAudio from "../../audios/presentation.wav";

import "../Home/Home.css"

import { useNavigate } from 'react-router-dom';

export function Home() {
    const [redirectToPage, setRedirectToPage] = useState(false);
    
    const navigate = useNavigate();
    
  

    useEffect(() => {
    
        const timer = setTimeout(() => {
            setRedirectToPage(true);
        
        }, 5000); 
        
      
        return () => clearTimeout(timer);
    }, []); 

    if (redirectToPage) {
        navigate("/Page")
    }


    return <>
 

        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-12 cont">

            
                  
              <div className="homeContainer">
          
             
           
                    <div className="homeContent">
                        <h1>Where’s Betaloc ZOK?</h1>
                       
                       
                        
                    </div>
                    <div className='titleButtom'>
                    <h3>This game uses interactive learning to enhance patient outcomes.</h3>
                    </div>
                    
                    <div className="sideHome">
                        <img className="w-100 mx-2" src={firstLogo} alt="" />
                        <img className="w-100" src={secondLogo} alt="" />

                    </div>
                    <div className="coinHome">
                        <img className="w-50" src={coinImage} alt="" />

                    </div>
                  
                   
                  
              </div>

  
             
    
              
           
               </div>
            </div>
        </div>
    </>
}

