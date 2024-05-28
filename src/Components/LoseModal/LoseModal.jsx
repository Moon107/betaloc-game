import Modal from 'react-modal';
import React from "react";
import { Link } from 'react-router-dom';


export const LoseModal = ({ show, onClose,restartGame  }) => {
  console.log('test');

    return <>
        <Modal className="winModalBox" isOpen={show} onRequestClose={onClose}>
      <div className='winModalCotainer'>
        <div className="winContent">
            <h1>Hard Luck! </h1>
           
         
       
            <button onClick={restartGame} className=' playButton mx-2'>Play Again</button>
            <Link to="/ChoosePage">
              <button className='playButton'>Return Home </button>
            </Link>
        </div>
       
        
         
     
      </div>
    </Modal>
    </>
}
