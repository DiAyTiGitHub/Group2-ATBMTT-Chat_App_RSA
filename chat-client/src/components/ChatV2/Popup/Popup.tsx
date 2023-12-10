import Button from '@mui/material/Button';
import './Popup.css'
import React, { useState } from "react";

export default function Popup(props) {
    const [popup, setPopup] = useState(false);

    const togglePopup = () => {
        setPopup(!popup);
    }
    
    return ( 
        <>
        <Button variant='contained' className="dismiss-button" onClick={togglePopup}> TEST POPUP</Button>
        {popup &&
        <div className='popup'>
        <div className="popup-title">{props.title}</div>
        <div className="popup-text">{props.content}</div>
        <div className="popup-button">
        {
            props.confirmation && <Button variant='contained' className="confirm-button"> YEA</Button>
        }
            <Button variant='contained' className="dismiss-button" onClick={togglePopup}> CLOSE</Button>
        </div>
        </div>
        }
        
        </>
    )
}