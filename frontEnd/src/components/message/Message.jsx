import React from 'react'
import './message.css'
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5";

const Message = ({sender, text, createdAt, delivered, seen, fileUrl, fileType}) => {
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
            {text && (
                <span className="messageText">{text}</span>
            )}

            {fileUrl && fileType?.startsWith("image") && (
                <img className='chatImage' src={`http://localhost:5000${fileUrl}`} alt="file" />
            )}

            {fileUrl && !fileType?.startsWith("image") && (
                <a className='fileLink' href={`http://localhost:5000${fileUrl}`} target='_blank' rel="noopener noreferrer">🔗 Download</a>
            )}
            
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