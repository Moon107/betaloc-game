import React, { useContext, useEffect, useState } from "react";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import "../ChoosePage/ChoosePage.css";
import { Link } from "react-router-dom";
import firstPhoto from "../../images/Pharmacyv1.png";
// import secondPhoto from "../../images/Pharmacyv2.png";
import thirdPhoto from "../../images/Pharmacyv3.png";
import fourthPhoto from "../../images/Pharmacyv4.png";
import UserNameContext from '../../Context/UserNameContext.js';
// import { ScoreContext } from '../../Context/ScoreContext';
import { LevelContext } from "../../Context/LevelContext.js";
import can from "../../images/thumbnail1.jpg";
import can1 from "../../images/thumbnail2.jpg";
import can2 from "../../images/thumbnail3.jpg";
// import coinImage from "../../images/coin.svg";




export function ChoosePage() {
    const { userName,  setUserName } = useContext(UserNameContext);
    const { completedLevels, setCompletedLevels } = useContext(LevelContext);
  

    const isLevelAvailable = (level) => completedLevels.includes(level);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setUserName(storedName);

        if(localStorage.getItem('level') !== null){
            const level = parseInt(localStorage.getItem('level'));
            console.log(level);
            setCompletedLevels((prevLevels) => [...prevLevels, level]);
            isLevelAvailable(level);
        }
    
      }, [setUserName]);
  
    return <>
      <div className="box ">
        <div className="container w-screen h-screen flex-grow overflow-auto">
            <div className="row">
                   <div className="parent-container">
                   <div className="col-md-12 chooseContainer">
                <div className="titleChoose">
                    <h2>Hello Dr. {userName}</h2>
             
                    </div>
                

                    <div className="sideHome">
                        <img className="w-100 mx-2" src={firstLogo} alt="" />
                        <img className="w-100" src={secondLogo} alt="" />

                    </div>

                    <h3 className="titleChoose1">Choose a Puzzle and find Betaloc boxes!</h3>

                    <div className="logoContainer   ">
                    <div className="blocksGame">
                                    {isLevelAvailable(1) ? (
                                        <Link to="/GameComponent">
                                            <img src={can} alt="" />
                                        </Link>
                                    ) : (
                                        <img  src={can} alt="" style={{ opacity: 0.5  }} />
                                    )}
                                    <h4 className="titleLevel">Theme 1</h4>
                                </div>
                                <div className="blocksGame">
                                    {isLevelAvailable(2) ? (
                                        <Link to="/Level2Component">
                                            <img src={can1} alt="" />
                                        </Link>
                                    ) : (
                                        <img className="image2" src={can1} alt="" style={{ opacity: 0.5 }} />
                                    )}
                                    <h4 className="titleLevel">Theme 2</h4>
                                </div>
                                <div className="blocksGame">
                                    {isLevelAvailable(3) ? (
                                        <Link to="/Level3Component">
                                            <img src={can2} alt="" />
                                        </Link>
                                    ) : (
                                        <img className="image3" src={can2} alt="" style={{ opacity: 0.5 }} />
                                    )}
                                    <h4 className="titleLevel">Theme 3</h4>
                                </div>
                                {/* <div className="blocksGame">
                                    {isLevelAvailable(4) ? (
                                        <Link to="/Level4Component">
                                            <img src={secondPhoto} alt="" />
                                        </Link>
                                    ) : (
                                        <img src={secondPhoto} alt="" style={{ opacity: 0.5 }} />
                                    )}
                                    <h5 className="titleLevel">Level 4</h5>
                                </div> */}


                    </div>


                   <div className="text-center playContainer">
                   <Link to="/Page">
                      <button className='playButton'>Return Back </button>
                       </Link>
                   </div>
                </div>
                   </div>
            </div>
        </div>
      </div>
    </>
}

