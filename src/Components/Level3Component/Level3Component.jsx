import React, { useState, useEffect, useRef, useContext } from "react";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import logo from "../../images/Frame55.png";
import can from "../../images/med.jpg";
import audioFile from '../../audios/collect-points.mp3';
import { Link } from "react-router-dom";
import { PreLoader } from "../PreLoader/PreLoader";
import MyModal from "../MyModal/MyModal";
import { WinModal } from "../WinModal/WinModal";
// import { DoneModal } from "../DoneModal/DoneModal";
// import { WrongModal } from "../WrongModal/WrongModal";
import coin from "../../images/coin.svg";
import { ScoreContext } from "../../Context/ScoreContext";
import { LevelContext } from "../../Context/LevelContext";
import { LoseModal } from "../LoseModal/LoseModal";
import UserNameContext from "../../Context/UserNameContext";
import wrongClick from "../../audios/Losing.wav";

export function Level3Component({currentLevel}) {
  const [remainingItems, setRemainingItems] = useState("");
  // const [showModal, setShowModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  // const [showDoneModal, setShowDoneModal] = useState(false);
  // const [showWrongModal, setShowWrongModal] = useState(false);
  const [completeCountDown, setCompleteCountDown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [correctSelections, setCorrectSelections] = useState(10);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [clickedPositions, setClickedPositions] = useState([]);


  const { score, setScore,addScore } = useContext(ScoreContext);
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
    setTimeLeft(30); // Increase timer by 10 seconds
    startCountdown(30);
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
    { x: 139, y: 455 },
    { x: 45, y: 454 },
    { x: 96, y: 96 },
    { x: 507, y: 104 },
    { x: 324, y: 102 },
    { x: 245, y: 271 },
    { x: 686, y: 268 },
    { x: 744, y: 325 },
    { x: 554, y: 337 },
    { x: 303, y: 337 },
  
   
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
          <span id="minutes">${Math.floor(time / 60).toString().padStart(2, "0")}</span> <span>m</span> :
          <span id="seconds">${(time % 60).toString().padStart(2, "0")}</span> <span>s</span>
      </div>
    `;
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const distance = countdownDate - now;
      const minutes = Math.floor(distance / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the seconds display
      document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
      document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");


      // Check if the countdown is complete
      if (distance <= 0) {
        // Clear the interval and change the button text when the countdown is finished
        clearInterval(intervalRef.current);
        startButton.innerHTML = "00m:00s";
        // counterButton.innerHTML = "Remaining Items";
        setGameStarted(false);
        setCompleteCountDown(true);
        if (correctSelections > 0) {
          setShowLoseModal(true);// Show modal when countdown is finished and there are remaining items
          
        }

      }
    }, 1000);
  };







  const handleCanvasClick = (event) => {
    if (!gameStarted || clicks >= 10) {
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
    console.log("Clicked Position:", { clickedX, clickedY });

    const positionAlreadyClicked = clickedPositions.some(
      pos => Math.abs(pos.x - clickedX) < tolerance && Math.abs(pos.y - clickedY) < tolerance
    );
  
    if (positionAlreadyClicked) {
      return; // Exit the function if the position was already clicked
    }

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
        setClickedPositions(prev => [...prev, { x: clickedX, y: clickedY }]);
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
          addScore(10);
          setScore(newScore);
          // localStorage.setItem("level3Score", newScore);
        }

        break;
      }
    }

    if(!clickedCorrectly) {
      return wrong.play();
    }
   
  };
  const restartGame = () => {
    console.log('test restartGame');
    clearInterval(intervalRef.current);
    setRemainingItems("");
    // setShowModal(false);
    // setShowDoneModal(false);
    setShowWinModal(false);
    // setShowWrongModal(false);
    setCompleteCountDown(false);
    setGameStarted(false);
    setClicks(0);
    setCorrectSelections(10);
    setTimeLeft(30);
    setScore(0);
    setClickedPositions([]);
    setShowLoseModal(false);

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const image = document.getElementById("scream");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  


  return (
    <div className="box">
    <PreLoader />
  <div className="container-fluid w-screen h-screen flex-grow overflow-auto flex items-center justify-center">
  <div className="sideHome">
            <img className="w-100 mx-2" src={firstLogo} alt="" />
              <img className="w-100" src={secondLogo} alt="" />

        </div>    
        <div className="row ">
    <div className="gamContent">
      <div className="col-md-12 block ">
      <div className=" titleZok">      
              <h4>Where’s Betaloc ZOK?</h4>
              <h5>Choose as much as Betaloc ZOK boxes as you can </h5>
            </div>
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
          
            <div className="countButton" id="counter-button">
            <h5>Maximum of <span className="number">   {correctSelections}</span> Boxes </h5>
            
              <div className="logoDescr">
            <img className="w-25 " src={logo} alt="Description" />
            </div>
            </div>
            
           </div>
           
            
            <div>
            <button
              id="start-game"
              className="timer-button"
              disabled={gameStarted}
              onClick={() => {
                startCountdown(60);
              }}
              >
            
              Start {" "}{ timeLeft } s
            </button>
            
            <h6 className="italic mt-2 clickText">Click here to start the Game</h6>
            </div>
            
          </div>
        </div>

      
        <div className="buttonBN">
          <div>
          <Link to="/ChoosePage">
              <button onClick={() => clearInterval(intervalRef.current)} className="btn btn-light backbutton">
                Back
              </button>
            </Link>
          </div>
            <div>
           <Link to="/Level2Component">
           {/* {selectedBoxes === 6 && (
            <button id="next-level-button" className="nextButtonGame" onClick={handleWin}>To the Next Level</button>
          )} */}
           </Link>
            </div>
           </div>
      </div>
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

    {showWinModal && (
    <WinModal show={showWinModal} onClose={() => setShowWinModal(false)} restartGame={restartGame} currentLevel={currentLevel} />
  )}
  {showLoseModal && (
            <LoseModal show={showLoseModal} onClose={() => setShowLoseModal(false)} restartGame={restartGame} />
        )}
  
 
</div>
  );
};