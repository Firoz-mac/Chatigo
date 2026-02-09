import React, { useEffect, useRef } from 'react'
import './home.css'
import logo from '../../assets/Logo/ChatigoLogoWithNameDark.png'
import { IoIosAddCircle } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { TbVideoFilled } from "react-icons/tb";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { IoIosAttach } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";
import ChatItem from '../../components/chatItem/ChatItem';
import Message from '../../components/message/Message';


const Home = () => {
    const bottomRef=useRef(null);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    },[])

  return (
    <div className='home'>
        <div className="chatList">
            <div className="chatListHead">
                <div className="logoSec">
                    <img src={logo} alt="Chatigo" />
                    <IoIosAddCircle className='addIcon'/>
                </div>
                <div className="inputWrapper">
                    <IoSearchOutline className='searchIcon' />
                    <input type="text" placeholder='Search Chat'/>
                </div>
            </div>
            <div className="chatListBody">
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
                <ChatItem/>
            </div>
        </div>
        <div className="chat">
            <div className="chatHead">
                <div className="chatHeadProfileSec">
                    <div className="profileWrapper">
                        <img src="https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZlbWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
                    </div>
                    <div className="profileInfo">
                        <span className='chatName'>Mac</span>
                        <span className='status'>Online</span>
                    </div>
                </div>
                <div className="chatHeadIcons">
                    <IoIosCall  className='icon'/>
                    <TbVideoFilled className='icon'/>
                    <BiDotsVerticalRounded className='icon'/>
                </div>
            </div>
            <div className="chatContent">
                <Message sender="me"/>
                <Message sender="other"/>
                <Message sender="me"/>
                <Message sender="me"/>
                <Message sender="other"/>
                <Message sender="other"/>
                <Message sender="other"/>
                <Message sender="me"/>
                <Message sender="me"/>
                <Message sender="me"/>
                <div ref={bottomRef} />
            </div>
            <div className="chatInputSec">
                <BsEmojiSmile className='emojiIcon'/>
                <input type="text" placeholder='Type a message'/>
                <IoIosAttach  className='attachIcon'/>
                <div className="btn">
                    {/* <IoMdSend /> */}
                    <MdKeyboardVoice />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home