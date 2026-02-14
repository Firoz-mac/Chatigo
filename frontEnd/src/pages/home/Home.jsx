import React, { useEffect, useRef, useState } from 'react'
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
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiMinusCircleFill } from "react-icons/pi";
import ChatItem from '../../components/chatItem/ChatItem';
import Message from '../../components/message/Message';
import api from '../../api/axios';
import { useQuery } from "@tanstack/react-query";
import ChatProfile from '../../components/chatProfile/ChatProfile';
import {fetchLoggedUserData} from '../../api/authApi';
import {fetchSearchingUsers} from '../../api/userApi';

const Home = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messageInput, setMessageInput] = useState('')
    const [addChatBtnValue, setAddChatBtnValue] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const bottomRef=useRef(null);
    const fileInputRef = useRef(null);

    const { data: loggedUserData, isLoading, isError } = useQuery({
        queryKey: ["loggedUserData"],
        queryFn: fetchLoggedUserData,
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    },[search]);

    const {data: searchedUsers, isFetching,} = useQuery({
        queryKey: ["searchedUsers", debouncedSearch],
        queryFn: () => fetchSearchingUsers(debouncedSearch),
        enabled:  debouncedSearch.length > 0,
    });

    useEffect(() => {
        console.log("Searched Users:", searchedUsers);
    },[searchedUsers]);

    useEffect(() => {
        if (chatOpen) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chatOpen])

    const handleMessageInput=(e)=>{
        setMessageInput(e.target.value);
    };

    const handleAddChatButton=()=>{
        setAddChatBtnValue(prev => !prev);
    };

    

  return (
    <div className={`home ${chatOpen ? 'chatOpen' : ''}`}>
        <div className="chatList">
            <div className="chatListHead">
                <div className="logoSec">
                    <img src={logo} alt="Chatigo" />
                    <div className="headRightSec">
                        {addChatBtnValue ? <PiMinusCircleFill onClick={()=>handleAddChatButton()} className='addIcon'/> :<IoIosAddCircle onClick={()=>handleAddChatButton()} className='addIcon'/>}
                        <div className="ownProfile">
                            <img src="https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="inputWrapper">
                    <IoSearchOutline className='searchIcon' />
                    <input type="text"  onChange={(e) => setSearch(e.target.value)} placeholder='Search Chat'/>
                </div>
            </div>
            {addChatBtnValue?
            <div className="chatListBodyAddChat">
                <ChatProfile/>
                <ChatProfile/>
                <ChatProfile/>
            </div>
            :
            <div className="chatListBody">
                <ChatItem onClick={() => setChatOpen(true)}/>
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
            }
        </div>
        <div className="chat">
            {chatOpen ?
            <>
                <div className="chatHead">
                    <div className="chatHeadProfileSec">
                        <MdOutlineKeyboardArrowLeft className='backArrowIcon' onClick={() => setChatOpen(false)} />
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
                    <input onChange={handleMessageInput} value={messageInput} type="text" placeholder='Type a message'/>
                    <IoIosAttach  className='attachIcon' onClick={() => fileInputRef.current.click()}/>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                    <div className="btn">
                        {messageInput.trim() === '' ? <MdKeyboardVoice /> : <IoMdSend />}
                    </div>
                </div>
            </>
            :   <div className="chatUnselected">
                    <span>Select a Chat to Start Messaging</span>
                </div> 
            }
        </div>
    </div>
  )
}

export default Home