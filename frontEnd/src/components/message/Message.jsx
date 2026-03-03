import React from 'react'
import './message.css'
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

const Message = ({sender, text, createdAt, delivered, seen}) => {
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
            <span className="messageTime">
                {formatTime(createdAt)}
                {sender === "me" && (
                    <span className='tick'>
                        {!delivered && !seen && (
                            <IoCheckmark size={10} className='tickSent'/>
                        )}

                        {delivered && !seen && (
                            <IoCheckmarkDone size={10} className='tickDelivered'/>
                        )}

                        {seen && (
                            <IoCheckmarkDone size={10} className='tickSeen'/>
                        )}
                    </span>
                )}
            </span>
        </div>
    )
}

export default Message