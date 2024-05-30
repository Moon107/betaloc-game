import React, { useState, useEffect, useRef, useContext } from "react";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import logo from "../../images/Frame55.png";
import can from "../../images/SecThemeHigh.jpg";
import audioFile from "../../audios/collect-points.mp3";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PreLoader } from "../PreLoader/PreLoader";
// import MyModal from "../MyModal/MyModal";
import { WinModal } from "../WinModal/WinModal";
import { DoneModal } from "../DoneModal/DoneModal";
import { WrongModal } from "../WrongModal/WrongModal";
import coin from "../../images/coin.svg";
import { ScoreContext } from "../../Context/ScoreContext";
import { LevelContext } from "../../Context/LevelContext";
import { LoseModal } from "../LoseModal/LoseModal";
import UserNameContext from "../../Context/UserNameContext";
import wrongClick from "../../audios/Losing.wav";
import MyModal2 from "../MyModal2/MyModal2";
import presentation from "../../audios/deal.mp3";

const getDynamicFactor = (windowWidth) => {
  if (windowWidth <= 500) return 0.06;
  if (windowWidth <= 1024) return 0.15;
  if (windowWidth <= 1500) return 0.1;
  return 0.05;
};

export const Level2Component = ({ currentLevel }) => {
  const [remainingItems, setRemainingItems] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [completeCountDown, setCompleteCountDown] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [correctSelections, setCorrectSelections] = useState(10);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showLoseModal, setShowLoseModal] = useState(false);
  // const [clickedObjects, setClickedObjects] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState(0);
  const [clickedPositions, setClickedPositions] = useState([]);
  const [childQuestions, setChildQuetions] = useState([]);
  const [clickCounter, setClickCounter] = useState(0);

  const { score, setScore, addScore, totalScore } = useContext(ScoreContext);
  const { completeLevel } = useContext(LevelContext);
  const { userName, setUserName } = useContext(UserNameContext);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const intervalRef = useRef(null);

  const initialCanvasWidth = 960;
  const initialCanvasHeight = 540;

  // Set initial canvas size based on the window size

  // const [canvasSize, setCanvasSize] = useState({
  //   width: window.innerWidth > initialCanvasWidth ? initialCanvasWidth - (window.innerWidth * 0.1) : window.innerWidth - (window.innerWidth * 0.1),
  //   height: window.innerHeight > initialCanvasHeight ? initialCanvasHeight : window.innerHeight * (initialCanvasHeight / initialCanvasWidth)
  // });
  const calculateCanvasSize = () => {
    const dynamicFactor = getDynamicFactor(window.innerWidth);
    const width =
      window.innerWidth > initialCanvasWidth
        ? parseInt(initialCanvasWidth - window.innerWidth * dynamicFactor)
        : parseInt(window.innerWidth - window.innerWidth * dynamicFactor);
    const height =
      window.innerHeight > initialCanvasHeight
        ? initialCanvasHeight
        : window.innerHeight * (initialCanvasHeight / initialCanvasWidth);

    return { width, height };
  };

  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);
  const circlePositions = [
    { x: 711, y: 481 },
    { x: 65, y: 412 },
    { x: 306, y: 302 },
    { x: 132, y: 50 },
    { x: 196, y: 259 },
    { x: 631, y: 134 },
    { x: 560, y: 186 },
    { x: 899, y: 329 },
    { x: 471, y: 95 },
    { x: 472, y: 359 },
  ];
  //// Update canvas size on window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setCanvasSize(calculateCanvasSize());
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

 
//   const handleClickCounter = () => {

//   console.log("test");
//     setClickCounter((prevCounter) => {
//       const newCounter = prevCounter + 1;
//       return newCounter;
//     });
  
//   if(clickCounter >= 1 ) {
//     startCountdown(15)
//   } else {
//     startCountdown(30)
//   }


// }


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    const image = document.getElementById("scream");
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.onerror = (error) => {
      console.error("Failed to load image", error);
    };
   
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
 
  }, []);

  // Adjust canvas size when `canvasSize` state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
  }, [canvasSize]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const storedScore = localStorage.getItem("score");
    if (storedScore) setScore(parseInt(storedScore, 10));
  }, [setUserName, setScore]);

  function getFromChild(question) {
    setChildQuetions([...childQuestions, question]);
  }

  const increaseTimer = () => {
    setTimeLeft(15); // Increase timer by 10 seconds
    startCountdown(15);
  };

  const handleWin = () => {
    // localStorage.setItem('level', currentLevel + 1);
    completeLevel(currentLevel + 1); // Example: if this is level 1, mark level 2 as available
    localStorage.setItem("score", score);
  };

  const handleLose = () => {
    setShowLoseModal(true);
  };

  const handleGameEnd = (didWin) => {
    if (didWin) {
      handleWin();
    } else {
      handleLose();
    }
  };

  const startCountdown = (time) => {
    const startButton = document.getElementById("start-game");
    const countdownDate = Date.now() + time * 1000;
    setGameStarted(true);
    startButton.innerHTML = `
      <div class="countdown" id="countdown">
          <span id="minutes">${Math.floor(time / 60)
            .toString()
            .padStart(2, "0")}</span> <span>m</span> :
          <span id="seconds">${(time % 60)
            .toString()
            .padStart(2, "0")}</span> <span>s</span>
      </div>
    `;
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const distance = countdownDate - now;
      const minutes = Math.floor(distance / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the seconds display
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");

      // Check if the countdown is complete
      if (distance <= 0) {
        // Clear the interval and change the button text when the countdown is finished
        clearInterval(intervalRef.current);
        startButton.innerHTML = "Start";
        setGameStarted(false);
        setCompleteCountDown(true);

        if (childQuestions.length == 3) {
          setShowLoseModal(true);
        }

        if (correctSelections > 0) {
          setShowModal(true); // Show modal when countdown is finished and there are remaining items
        }
      }
    }, 1000);
  };

  const handleAnimationComplete = (isComplete) => {
    if(isComplete) {
      startCountdown(30)
      const presentation = document.getElementById("presentation");
      presentation.play();
    }

  }

  const handleCanvasClick = (event) => {
    if (!gameStarted || clicks >= 10) {
      return;
    }

    const clickedX = event.nativeEvent.offsetX;
    const clickedY = event.nativeEvent.offsetY;
    const aud = document.getElementById("fileSound");
    const wrong = document.getElementById("wrongSound");
    let clickedCorrectly = false;
    const ctx = ctxRef.current;
    const tolerance = 20; // Adjust tolerance as needed

    // Calculate scaling factors
    const scaleX = canvasSize.width / initialCanvasWidth;
    const scaleY = canvasSize.height / initialCanvasHeight;

    // Scale positions based on current canvas size
    const scaledPositions = circlePositions.map((position) => ({
      x: position.x * scaleX,
      y: position.y * scaleY,
    }));

    console.log("Clicked Position:", { clickedX, clickedY });
    console.log("Scaled Positions:", scaledPositions);

    // Check if the position was already clicked
    const positionAlreadyClicked = clickedPositions.some(
      (pos) =>
        Math.abs(pos.x - clickedX) < tolerance &&
        Math.abs(pos.y - clickedY) < tolerance
    );

    if (positionAlreadyClicked) {
      return; // Exit the function if the position was already clicked
    }

    for (const position of scaledPositions) {
      if (
        Math.abs(clickedX - position.x) < tolerance &&
        Math.abs(clickedY - position.y) < tolerance
      ) {
        ctx.beginPath();
        ctx.arc(position.x, position.y, 22, 0, Math.PI * 2);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Add the position to the list of clicked positions
        setClickedPositions((prev) => [...prev, { x: clickedX, y: clickedY }]);

        setClicks((prevClicks) => prevClicks + 1);
        setCorrectSelections((prev) => prev - 1);
        setSelectedBoxes((prev) => prev + 1); // Update selected boxes

        clickedCorrectly = true;

        aud.play();

        if (correctSelections - 1 === 0) {
          clearInterval(intervalRef.current);
          setTimeLeft(0);
          const startButton = document.getElementById("start-game");
          startButton.innerHTML = "Start";
          setTimeout(() => {
            setShowWinModal(true);
          }, 2000);
          // localStorage.setItem("score", totalScore);
          setGameStarted(false);
        }

        // const newScore = score + 10;
        // setScore(newScore);
        // localStorage.setItem("score", newScore);
        if (clickedCorrectly) {
          console.log(clicks);
          const newScore = score + 10;
          addScore(10);

          setScore(newScore);
          // localStorage.setItem("level1Score", clicks * 10);
        }

        break;
      }
    }

    if (!clickedCorrectly) {
      wrong.play();
    }
  };



  const restartGame = () => {
    clearInterval(intervalRef.current);
    setRemainingItems("");
    setShowModal(false);
    setShowDoneModal(false);
    setShowWinModal(false);
    setShowWrongModal(false);
    setShowLoseModal(false);
    setClicks(0);
    setCorrectSelections(10);
    setTimeLeft(60);
    setScore(0);
    setSelectedBoxes(0); // Reset selected boxes
    setChildQuetions([]);
    setClickedPositions([]);
    setShowLoseModal(false);
    localStorage.setItem("score", 0);

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const image = document.getElementById("scream");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="box overflow-auto ">
     <PreLoader handleAnimationComplete={handleAnimationComplete} />
    <div className="container-fluid  flex items-center justify-center">
    <audio
            loop
            id="presentation"
            src={presentation}
            style={{ display: "none" }}
          ></audio>
      <div className="sideHome">
        <img className="w-100 mx-2" src={firstLogo} alt="" />
        <img className="w-100" src={secondLogo} alt="" />

      </div>
      <div className="gamContent">

        <div className="row">
          <div className="col-md-12 block">
            <div className="titleZok">
              <h4>Where is Betaloc ZOK?</h4>
              <h5>Choose as much as Betaloc ZOK boxes as you can </h5>
            </div>
          </div>
        </div>

        <div className="row justify-center items-center">
          <div className="col-12 col-sm-10 col-lg-11 p-1 col-xl-9 boxImageee" >
            <img id="scream" src={can} alt="" style={{ display: "none" }} />
            <audio id="fileSound" src={audioFile} style={{ display: "none" }}></audio>
            <audio id="wrongSound" src={wrongClick} style={{ display: "none" }}></audio>
            <canvas
              ref={canvasRef}
              id="canvas"
              width={canvasSize.width}
              height={canvasSize.height}
              onClick={handleCanvasClick}
            ></canvas>
          </div>
          <div className="col-12 col-lg-7 col-xl-3">
               <div className="timeBox">
               <div className="betalContainer">
            <div className="countButton" id="counter-button">
              <h5>Maximum of <span className="number">   {correctSelections}</span> Boxes </h5>
              <div className="logoDescr">
                <img  src={logo} alt="Description" />
              </div>

              </div>
              <div className="timerBox">
                  <button
                    id="start-game"
                    className="timer-button"
                    disabled={gameStarted}
                  
                  >
                    Start {timeLeft}s
                  </button>
                  <h6 className="italic mt-2 clickText">Click here to start the Game</h6>
                </div>
               </div>
              

            </div>

            
          </div>
          
        </div>

       <div className="row justify-center items-center buttonBox">
          <div className="col-12 col-lg-3">
            <div className="buttonBN">
              <div className="text-center">
                <Link to="/ChoosePage">
                  <button onClick={() => clearInterval(intervalRef.current)} className="btn btn-light backbutton ">
                    Back
                  </button>
                </Link>
              </div>
           
            </div>
          </div>
          <div className="col-12 col-lg-3">  
           <div className="text-center buttonBN">
                <Link to="/Level3Component">
                  {selectedBoxes >= 6 && (
                    <button id="next-level-button" className=" nextButtonGame" onClick={handleWin}>To Next Level</button>
                  )}
                </Link>
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
      <button
        style={{ display: "none" }}
        onClick={() => handleGameEnd(true)}
      ></button>
      <button
        style={{ display: "none" }}
        onClick={() => handleGameEnd(false)}
      ></button>
      {showModal && completeCountDown && correctSelections > 0 && (
        <MyModal2
          childQuestions={childQuestions}
          getFromChild={getFromChild}
          show={showModal}
          onClose={() => setShowModal(false)}
          remainingItems={remainingItems}
          increaseTimer={increaseTimer}
          restartGame={restartGame}
        >
          <h2>Test Modal</h2>
        </MyModal2>
      )}
      {showDoneModal && (
        <DoneModal
          show={showDoneModal}
          onClose={() => setShowDoneModal(false)}
        />
      )}
      {showWrongModal && (
        <WrongModal
          show={showWrongModal}
          onClose={() => setShowWrongModal(false)}
        />
      )}

      {showWinModal && (
        <WinModal
          show={showWinModal}
          onClose={() => setShowWinModal(false)}
          restartGame={restartGame}
          currentLevel={currentLevel}
        />
      )}
      {showLoseModal && (
        <LoseModal
          show={showLoseModal}
          onClose={() => setShowLoseModal(false)}
        />
      )}
    </div>
  );
};
