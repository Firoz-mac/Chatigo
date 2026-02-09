import React from 'react'
import './message.css'

const Message = (sender) => {
    return (
        <div className={`chatMessage ${sender.sender}`}>
            <span className="messageText">Hey! How’s it going?</span>
            <span className="messageTime">2:15 AM</span>
        </div>
    )
}

export default Message