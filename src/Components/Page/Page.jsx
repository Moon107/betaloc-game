import React, { useEffect } from "react";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import "./SignPage.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserNameContext from '../../Context/UserNameContext.js';
import { ScoreContext } from "../../Context/ScoreContext.js";





export function Page() {

    const navigate = useNavigate();
    const { userName, handleNameChange  , setUserName,  } = useContext(UserNameContext);
    const { score , setScore } = useContext(ScoreContext);
    // const { setCompletedLevels } = useContext(LevelContext);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && userName) {
            const getName = localStorage.getItem("userName");
            localStorage.setItem("userName", userName);
            if(getName !== null && userName.toLowerCase() !== getName.toLowerCase()) {
              localStorage.setItem("score", 0); // Reset the score in local storage
              localStorage.setItem("level" , 1);
              setScore(0);
            }
  
            navigate("/ChoosePage");
        }
      };

      const handleButtonClick = () => {
        if (userName) {
            const getName = localStorage.getItem("userName");
            localStorage.setItem("userName", userName);
            if(getName !== null && userName.toLowerCase() !== getName.toLowerCase() ) {
              localStorage.setItem("score", 0); // Reset the score in local storage
              localStorage.setItem("level" , 1);
              setScore(0);
            }
  
          navigate("/ChoosePage");
        } 
      };

      useEffect(() => {
        const storedName = localStorage.getItem("userName");

        if (storedName) setUserName(storedName);
      
      }, []);


    return <>
       <div className="container-fluid w-screen h-screen flex-grow overflow-auto">
        <div className="row">
            <div className="col-md-12 cont">
                <div className="signContainer">
                    <div className="signContent">
                    <h1>Hello Doctor,</h1>
                    <h2>Ready to embark on your medical learning journey?</h2>
                   <div className="row my-5">
                      <div className="col-12 col-md ">
                        <input className="form-control shadow-md inputSign  " type="text" name="" id="" placeholder="Please Enter your Name" 
                        onChange={handleNameChange} onKeyPress={handleKeyPress} />
                      </div>
                     
                    
                   </div>
                  
                
              
                       <button className="startButton" onClick={handleButtonClick} disabled={!userName }>Start Game</button>
                   
                    </div>
                   
                  

                    <div className="sideSign shadow">
                        <img className="w-100 mx-2" src={firstLogo} alt="" />
                        <img className="w-100" src={secondLogo} alt="" />

                    </div>

                    

                </div>
               
            </div>
        </div>
       </div>
    </>
}