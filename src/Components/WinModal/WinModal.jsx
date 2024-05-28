import Modal from 'react-modal';
import React, { useContext } from "react";
import firstLogo from "../../images/Group18.png";
import secondLogo from "../../images/VectorSmartObject.png";
import { ScoreContext } from '../../Context/ScoreContext';
import coin from "../../images/coin.svg";
import "../WinModal/WinModal.css";
import { Link, useNavigate } from 'react-router-dom';
import { LevelContext } from '../../Context/LevelContext';
import backgroundVideo from "../../videos/golden-particles.mov";

export const WinModal = ({ show, onClose, restartGame, currentLevel   }) => {

  const { score, totalScore } = useContext(ScoreContext);
  const { completeLevel } = useContext(LevelContext);
    const navigate = useNavigate();
     

    const handleReturn  = () => {
      localStorage.setItem("score", 0);
      console.log("handleReturn");
    }
    
    const handleNextLevel = () => {
      completeLevel(currentLevel + 1);
      localStorage.setItem("score", totalScore);
      navigate(`/Level${currentLevel + 1}Component`); // Adjust the route according to your setup
      onClose();
  };

    return <>
        <Modal className="winModalBox" isOpen={show} onRequestClose={onClose}>
      <div className='winModalCotainer'>
      <video className='backgroundVideo' autoPlay loop muted>
            <source src={backgroundVideo} />
          </video>
        <div className="winContent">
            <h1>Congratulations! </h1>
            <h3 className='placed' >You placed all circles correctly.</h3>
            <div className="contentScore">
              <div className='mr-5'>
                  <img  className='w-100 '  src={firstLogo} alt="" />
              </div>
              {currentLevel === 3 && (
              <div className="totalScore mr-5 ">
                <h4>Total Score </h4> {/* Display total score after third level */}
                <div className='scoreBox'>
                <span className='scoreNum'>{totalScore}</span>
                <img className="coinImage3" src={coin} alt="" />
                </div>
                
              </div>
            )}
               <div>
                  <img className='w-100 mb-2' src={secondLogo} alt="" />
              </div>
            </div>
            
           
         <div className='d-flex align-items-center justify-content-center'>
         <button onClick={restartGame} className=' playButton'>Play Again</button>
            {currentLevel === 3 && (
              <div>
                 <Link to="/ChoosePage">
               <button onClick={handleReturn} className='playButton '>Return Home </button>
             </Link>
             
              </div>
            )} 
            {currentLevel < 3 && (
              <div>
                 <Link to="/ChoosePage">
               <button className='playButton'>Return Home </button>
             </Link>
              <button onClick={handleNextLevel} className="nextButton">To Next Theme</button>
              </div>
            )} 
         </div>
         
        </div>
       
        
       
        
         
     
      </div>
    </Modal>
    </>
}
