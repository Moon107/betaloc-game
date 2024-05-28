import React, { useState, useEffect, useRef, useContext } from "react";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import logo from "../../images/Frame55.png";
import can from "../../images/medical3.jpg";
import audioFile from '../../audios/collect-points.mp3';
import { Link } from "react-router-dom";
import { PreLoader } from "../PreLoader/PreLoader";
import MyModal from "../MyModal/MyModal";
import { WinModal } from "../WinModal/WinModal";
import { DoneModal } from "../DoneModal/DoneModal";
import { WrongModal } from "../WrongModal/WrongModal";
import coin from "../../images/coin.svg";
import { ScoreContext } from "../../Context/ScoreContext";
import { LevelContext } from "../../Context/LevelContext";
import { LoseModal } from "../LoseModal/LoseModal";
import UserNameContext from "../../Context/UserNameContext";
import wrongClick from "../../audios/Losing.wav";

export function Level4Component({currentLevel}) {
  const [remainingItems, setRemainingItems] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [completeCountDown, setCompleteCountDown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [correctSelections, setCorrectSelections] = useState(11);
  const [timeLeft, setTimeLeft] = useState(30); 
  const [showLoseModal, setShowLoseModal] = useState(false);


  const { score, setScore } = useContext(ScoreContext);
  const { completeLevel } = useContext(LevelContext);
  const { userName,  setUserName } = useContext(UserNameContext);
  
 

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const storedScore = localStorage.getItem("score");
    if (storedScore) setScore(parseInt(storedScore, 10));

  }, [setUserName, setScore]);



  const increaseTimer = () => {
    setTimeLeft(10); // Increase timer by 10 seconds
    startCountdown(10);
  };

  

  const handleWin = () => {
      completeLevel(2); // Example: if this is level 1, mark level 2 as available
      setShowWinModal(true);
  };

  const handleLose = () => {
      setShowLoseModal(true);
  };

  // Assuming you have a function to handle the game logic
  const handleGameEnd = (didWin) => {
      if (didWin) {
          handleWin();
      } else {
          handleLose();
      }
  };



  const circlePositions = [
    { x: 171, y: 379 },
    { x: 799, y: 445 },
    { x: 948, y: 434 },
    { x: 443, y: 378 },
    { x: 525, y: 521 },
    { x: 829, y: 286 },
    { x: 633, y: 328 },
    { x: 652, y: 263 },
    { x: 331, y: 181 },
    { x: 705, y: 135 },

    { x: 103, y: 252 },
  
   
  ];
 


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    canvas.width = 960;
    canvas.height = 540;

    // const img = new Image();
    // img.src = "../../images/whereIsBetalok.webp";
    const image = document.getElementById("scream");

    image.onload = () => {
      console.log("Image loaded successfully");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    image.onerror = (error) => {
      console.error("Failed to load image", error);
    };
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
 
  }, []);




  const startCountdown = (time) => {
  
    const startButton = document.getElementById("start-game");
    

    const countdownDate = Date.now() + time * 1000;
    setGameStarted(true);
    startButton.innerHTML = `
  <div class="countdown" id="countdown">
      <span id="minutes">00</span> <span>m</span> :
      <span id="seconds">${time}</span> <span>s</span>
  </div>
`;
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const distance = countdownDate - now;
      const seconds = Math.floor(distance / 1000);
        
      // Update the seconds display
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");

      // Check if the countdown is complete
      if (distance <= 0) {
        // Clear the interval and change the button text when the countdown is finished
        clearInterval(intervalRef.current);
        startButton.innerHTML = "00m:00s";
        // counterButton.innerHTML = "Remaining Items";
        setGameStarted(false);
        setCompleteCountDown(true);
        if (correctSelections > 0) {
          setShowModal(true); // Show modal when countdown is finished and there are remaining items
          
        }

      }
    }, 1000);
  };







  const handleCanvasClick = (event) => {
    if (!gameStarted || clicks >= 11) {
      return;
    }

    const clickedX = event.nativeEvent.offsetX;
    const clickedY = event.nativeEvent.offsetY;
    const aud =  document.getElementById("fileSound");
    const wrong =  document.getElementById("wrongSound");
    let clickedCorrectly = false;
    const ctx = ctxRef.current;
    const tolerance = 20; // Adjust tolerance as needed
    let foundPosition = false;

    for (const position of circlePositions) {
      if (
        Math.abs(clickedX - position.x) < tolerance &&
        Math.abs(clickedY - position.y) < tolerance
      ) {
        foundPosition = true;
        ctx.beginPath();
        ctx.arc(position.x, position.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();
        setClicks((prevClicks) => prevClicks + 1);
        setCorrectSelections((prev) => prev - 1);
        clickedCorrectly = true;

       
          aud.play();
     

        if (correctSelections - 1 === 0) {
          clearInterval(intervalRef.current);
          setTimeLeft(0);
          const startButton = document.getElementById("start-game");
          startButton.innerHTML = `Start ${ timeLeft } s`; 
          setShowWinModal(true)
          // alert("Congratulations! You placed all circles correctly.");
          setGameStarted(false);
          
        }
        if (clickedCorrectly) {
          const newScore = score + 10;
          setScore(newScore);
          localStorage.setItem("score", newScore);
        }

        break;
      }
    }
    if(!clickedCorrectly) {
      return wrong.play();
    }
  };
  const restartGame = () => {
    clearInterval(intervalRef.current);
    setRemainingItems("");
    setShowModal(false);
    setShowDoneModal(false);
    setShowWinModal(false);
    setShowWrongModal(false);
    setCompleteCountDown(false);
    setGameStarted(false);
    setClicks(0);
    setCorrectSelections(11);
    setTimeLeft(30);
    setScore(0);
    localStorage.setItem("score", 0);

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const image = document.getElementById("scream");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  


  return (
    <div className="box">
    <PreLoader />
  <div className="container ">
    <div className="row  gameCont">
  
     <div className="col-md-2 boxImage">
        <div className="groupCont">
          <img className="w-75 logoImage " src={firstLogo} alt="Logo" />
        </div>
      </div>
      <div className="col-md-8">
        <div className="title">
          <h4 >Hello Dr. {userName} Your Medical Expertise has grown! </h4>
         
          <h4>
            Continue honing your skills with more interactive learning.
          </h4>
        </div>
      </div>
      <div className="col-md-2 boxImage ">
        <div className="groupCont">
          <img className="w-75 logoImage pb-2" src={secondLogo} alt="Logo" />
        </div>
      </div>
   
    </div>
    <div className="row gamContent">
      <div className="col-md-12 block ">
        <div className="myCanvas">
          <img id="scream" src={can} alt="" style={{ display: "none" }} />
          <audio id="fileSound" src={audioFile} style={{ display: "none" }}></audio>
          <audio id="wrongSound" src={wrongClick} style={{ display: "none" }}></audio>
          <canvas
            ref={canvasRef}
            id="canvas"
            onClick={handleCanvasClick}
          ></canvas>
          <div className="betalContainer">
           <div >
           <h4 >Where’s Betaloc ZOK?</h4>
            <div className="countButton" id="counter-button">
              <h5>
                Select <span className="number">{correctSelections}</span>{" "}
                betaloc boxes
              </h5>
              <div className="logoDescr">
            <img className="w-75 " src={logo} alt="Description" />
            </div>
            </div>
            
           </div>
           
            
            <div>
            <button
              id="start-game"
              className="timer-button"
              
              onClick={() => {
                startCountdown(30);
              }}
              >
            
              Start {" "}{ timeLeft } s
            </button>
            
            <h6 className="italic mt-2 clickText">Click here to start the Game</h6>
            </div>
            
          </div>
        </div>

      
       <Link to="/ChoosePage">
       <button onClick={() => clearInterval(intervalRef.current)} className="btn btn-light  backbutton" >
          Back
        </button></Link>
      </div>
    </div>
    <div className="scoreContainer">
      <h5>Your Score <span className="scoreValue">{score}</span></h5>
      <div>
        <img className="coinImage" src={coin} alt="" />
      </div>
    </div>
  </div>
  <button style={{display: "none"}} onClick={() => handleGameEnd(true)}></button>
  <button style={{display: "none"}} onClick={() => handleGameEnd(false)}></button>
  {showModal && completeCountDown && correctSelections > 0 && (
    <MyModal show={showModal} onClose={() => setShowModal(false)} remainingItems={remainingItems} increaseTimer={ increaseTimer } restartGame={restartGame}
     >
    <h2>Test Modal</h2>
  </MyModal>
   )}
    {showDoneModal && (
    <DoneModal show={showDoneModal} onClose={() => setShowDoneModal(false)} />
  )}
    {showWrongModal && (
    <WrongModal show={showWrongModal} onClose={() => setShowWrongModal(false)} />
  )}

    {showWinModal && (
    <WinModal show={showWinModal} onClose={() => setShowWinModal(false)} restartGame={restartGame} currentLevel={currentLevel} />
  )}
  {showLoseModal && (
            <LoseModal show={showLoseModal} onClose={() => setShowLoseModal(false)} />
        )}
  
 
</div>
  );
};