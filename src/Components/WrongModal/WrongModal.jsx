import Modal from 'react-modal';
import React from "react";
import wrongAnswer from "../../images/wrongAnswer.png";



export const WrongModal = ({ show, onClose, onContinue, correctAnswer }) => {
    return <>
        <Modal className="DoneModalBox" isOpen={show} onRequestClose={onClose}>
      <div className=''>
        <div className="DoneContent">
            <div className=' modalContainer1'>
            <div className='d-flex justify-content-center align-items-center'>
                    <img className='rightImage' src={wrongAnswer} alt="" />
                 
                </div>
                <div>
                <p className='paragraphWrong '><span className='text-danger'>Sorry, You have selected the wrong answer.</span> </p>
                <p className='paragraphWrong '><span className='text-danger'>The correct answer was: <span className='text-black' >{correctAnswer}</span></span></p>
                <p className='paragraphWrong'>You can still try another Question!</p>
                 <span className='numberzero'>0</span>
                </div>
               
                <div className='contButt'>
                <button onClick={onContinue}  className=' ContinueButton1'>Continue</button>
                </div>
            </div>
            
            
        </div>
        
         
     
      </div>
    </Modal>
    </>
}