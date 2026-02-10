import React from 'react'
import './chatItem.css'

const ChatItem = ({onClick}) => {
  return (
    <div className='chatItem' onClick={onClick}>
        <div className="profileWrapper">
            <img src="https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZlbWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
        </div>
        <div className="chatItemDetail">
            <div className="chatItemHead">
                <span className='userName'>Mac</span>
                <span className='timestamp'>2:15 am</span>
            </div>
            <div className="chatItemContent">
                <span>typing....</span>
                <div className="chatCount">1</div>
            </div>
        </div>
    </div>
  )
}

export default ChatItem