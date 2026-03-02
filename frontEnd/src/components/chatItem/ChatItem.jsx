import React from 'react'
import './chatItem.css'

const ChatItem = ({ userName, profileImg, lastMessage, onClick, unreadCount}) => {
  return (
    <div className='chatItem' onClick={onClick}>
        <div className="profileWrapper">
            <img src={profileImg || "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg" } alt="" />
        </div>
        <div className="chatItemDetail">
            <div className="chatItemHead">
                <span className='userName'>{userName}</span>
                <span className='timestamp'>2:15 am</span>
            </div>
            <div className="chatItemContent">
                <span>{lastMessage}</span>
                {unreadCount>0 && (
                    <div className="chatCount">{unreadCount}</div>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default ChatItem