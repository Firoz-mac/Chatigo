import React, { useEffect } from 'react'
import './chatProfile.css'

const ChatProfile = ({user}) => {

  return (
    <div className='chatProfile'>
        <div className="profileWrapper">
            <img src={user.profileImg || "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"} alt="" />
        </div>
        <span>{user.userName}</span>
    </div>
  )
}

export default ChatProfile