import Modal from 'react-modal';
import React from "react";
import rightAnswer from "../../images/rightAnswer.png";
import "../DoneModal/DoneModal.css"


export const DoneModal = ({ show, onClose, onContinue   }) => {
    return <>
        <Modal className="DoneModalBox" isOpen={show} onRequestClose={onClose}>
      <div className=''>
        <div className="DoneContent">
            <div className=' modalContainer'>
            <div className='d-flex justify-content-center align-items-center'>
                    <img className='rightImage' src={rightAnswer} alt="" />
                    <h2 className='titleExcellent'>Excellent work, doctor! </h2>
                </div>
                <div>
               
                <p className='paragraph'>You’ve added 15 sec</p>
                 <span className='plus'>+15</span>
                </div>
               
                <button onClick={ onContinue }  className=' ContinueButton'>Continue</button>
            </div>
            
            
        </div>
        
         
     
      </div>
    </Modal>
    </>
}