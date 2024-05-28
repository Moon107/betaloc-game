import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from "axios";

import "../MyModal/MyModal.css";
import { DoneModal } from '../DoneModal/DoneModal';
import { WrongModal } from '../WrongModal/WrongModal';
import { LoseModal } from '../LoseModal/LoseModal';




const MyModal = ({ show, onClose, remainingItems, increaseTimer , restartGame, getFromChild, childQuestions }) => {


  


 
  const [displayData, setDisplayData] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shownQuestions, setShownQuestions] = useState([]);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');


  useEffect(() => {
    axios.get('./db.json')
      .then(response => {
        const filterData = response.data.data.filter((question) => {
          return !childQuestions.includes(question.id);
        })
        if(filterData.length != 0){
          const shuffledData = shuffleArray(filterData);
          setDisplayData(shuffledData);
          setShownQuestions([shuffledData[0].id]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const getNextQuestionIndex = () => {
    for (let i = 0; i < displayData.length; i++) {
      if (!shownQuestions.includes(displayData[i].id)) {
        return i;
       
      }
    }
    return -1; // No more new questions
  };

  const handleChange = (choice) => {
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    const currentQuestion = displayData[currentQuestionIndex];
    if (selectedChoice === currentQuestion.correctChoice) {
      
      setShowDoneModal(true);

    } else {
      setCorrectAnswer(currentQuestion.correctChoice);
      setShowWrongModal(true);
      
    
    }
  };

  if (displayData.length === 0) {
    return null;
  }
  const handleContinue = () => {
    increaseTimer();
    const currentQuestion = displayData[currentQuestionIndex];
    getFromChild(currentQuestion.id);
    setShowDoneModal(false);
    onClose();
  };
  const handleWrongContinue = () => {
    const nextQuestionIndex = getNextQuestionIndex();
    if (nextQuestionIndex !== -1) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setShownQuestions([...shownQuestions, displayData[nextQuestionIndex].id]);
      setSelectedChoice('');
      setShowWrongModal(false);
      const currentQuestion = displayData[currentQuestionIndex];
      getFromChild(currentQuestion.id);
    }
    if (nextQuestionIndex === -1) { // Check if all questions answered
      setShowWrongModal(false); // Hide WrongModal if no more questions
      setShowLoseModal(true); }
 
  };
 
  

  const currentQuestion = displayData[currentQuestionIndex];

  

  return (

    <div>
      <Modal className="modalBox" isOpen={show} onRequestClose={onClose}>
      <div className='modalCotainer'>
        <div className="content">
          <h4>Time's Up!</h4>
          <h4>Answer this question to get extra 30 seconds!</h4>
          <div className='question'>
            <h5>{currentQuestion.question}</h5>
          </div>
          <div className='list'>
            <form>
              <ol>
                {[
                  currentQuestion.firstChoice,
                  currentQuestion.secondChoice,
                  currentQuestion.thirdChoice,
                 
                ].map((choice, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        name="letter"
                        value={choice}
                        checked={selectedChoice === choice}
                        onChange={() => handleChange(choice)}
                        className='mx-2'
                      />
                      {choice}
                    </label>
                  </li>
                ))}
              </ol>
            </form>
            <div>
              <button className='plusButton'>+30</button>
            </div>
          </div>
          {remainingItems > 0 && <p>Remaining Items: {remainingItems}</p>}
          <button onClick={handleSubmit} className='btn btn-warning text-black'>Submit</button>
        </div>
        
      </div>
    </Modal>
    {showDoneModal && (
        <DoneModal show={showDoneModal} onClose={() => setShowDoneModal(false)} onContinue={handleContinue} />
      )}
       {showWrongModal && (
        <WrongModal show={showWrongModal} onClose={() => setShowWrongModal(false)} onContinue={handleWrongContinue} correctAnswer={correctAnswer} />
      )}
       {showLoseModal && (
        <LoseModal show={showLoseModal} onClose={() => setShowLoseModal(false)} onContinue={handleWrongContinue} restartGame={restartGame} />
      )}
     
    </div>

  

   

  );
};

export default MyModal;





