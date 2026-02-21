import React from 'react'
import './message.css'

const Message = ({sender, text, createdAt}) => {
    console.log("createdAt:",createdAt)

    const formatTime = (data)=>{
        if(!data) return "";
        return new Date(data).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className={`chatMessage ${sender}`}>
            <span className="messageText">{text}</span>
            <span className="messageTime">{formatTime(createdAt)}</span>
        </div>
    )
}

export default Message