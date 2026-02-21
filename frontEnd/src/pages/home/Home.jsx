import React, { use, useEffect, useRef, useState } from 'react'
import './home.css'
import socket from "../../socket";
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
import { fetchConversations ,createOrGetConversation } from '../../api/conversationApi';
import selectedChatStore from './../../store/selectedChatStore';
import { fetchMessages, sendMessage } from './../../api/messageApi';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Home = () => {
    const [messageInput, setMessageInput] = useState('')
    const [addChatBtnValue, setAddChatBtnValue] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const {setSelectedConversation,selectedConversation} =selectedChatStore();
    const queryClient = useQueryClient();
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

    useEffect(()=>{
        if(loggedUserData?._id){
            socket.emit("join", loggedUserData._id);
        }
    }, [loggedUserData]);

    useEffect(()=>{
        const handleReceiveMessage=(newMessage)=>{
            queryClient.setQueryData(
                ["messages", newMessage.conversation],
                (old=[])=>[...old, newMessage]
            );

            //update conversation list automatically
            queryClient.invalidateQueries({queryKey:["conversations"]});
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return ()=>{
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []);

    const {data: searchedUsers, isFetching,} = useQuery({
        queryKey: ["searchedUsers", debouncedSearch],
        queryFn: () => fetchSearchingUsers(debouncedSearch),
        enabled:  debouncedSearch.length > 0,
    });

    const {data: conversations}= useQuery({
        queryKey: ["conversations"],
        queryFn: fetchConversations,
    });

    const otherUserInChat = selectedConversation?.participants?.find(
        (p) => p._id !== loggedUserData?._id
    );

    const { data: messages } = useQuery({
    queryKey: ["messages", selectedConversation?._id],
    queryFn: () => fetchMessages(selectedConversation._id),
    enabled: !!selectedConversation,
    });

    useEffect(() => {
        console.log("conversations:", conversations);
    },[conversations]);
    

    useEffect(() => {
        console.log("Searched Users:", searchedUsers);
    },[searchedUsers]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleMessageInput=(e)=>{
        setMessageInput(e.target.value);
    };

    const handleAddChatButton=()=>{
        setAddChatBtnValue(prev => !prev);
    };

    const { mutate: sendMessageMutate } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", selectedConversation._id] });
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
            setMessageInput("");
        },
    });

    const { mutate: createConversationMutate } = useMutation({
        mutationFn: createOrGetConversation,
        onSuccess: (conversation) => {
            setSelectedConversation(conversation);

            queryClient.invalidateQueries({ queryKey: ["conversations"] });

            setAddChatBtnValue(false);
            setSearch("");
        }
    });

    

  return (
    <div className={`home ${selectedConversation ? 'chatOpen' : ''}`}>
        <div className="chatList">
            <div className="chatListHead">
                <div className="logoSec">
                    <img src={logo} alt="Chatigo" />
                    <div className="headRightSec">
                        {addChatBtnValue ? <PiMinusCircleFill onClick={()=>handleAddChatButton()} className='addIcon'/> :<IoIosAddCircle onClick={()=>handleAddChatButton()} className='addIcon'/>}
                        <div className="ownProfile">
                            <img src={loggedUserData?.profileImg? loggedUserData.profileImg: "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"} alt="" />
                        </div>
                    </div>
                </div>
                <div className="inputWrapper">
                    <IoSearchOutline className='searchIcon' />
                    <input type="text"  onChange={addChatBtnValue? (e) => setSearch(e.target.value):null} placeholder='Search Chat'/>
                </div>
            </div>
            {addChatBtnValue?
            <div className="chatListBodyAddChat">
                {searchedUsers?.map((users)=>{
                    return (
                        <ChatProfile key={users._id} user={users} onClick={() => createConversationMutate(users._id)}/>
                    );
                })}
            </div>
            :
            <div className="chatListBody">
                {conversations?.map((conversation)=>{
                    const otherUser = conversation.participants.find(
                        (p)=>p._id !== loggedUserData?._id
                    );

                    return (
                        <ChatItem key={conversation._id} userName={otherUser?.userName} profileImg={otherUser?.profileImg} lastMessage={conversation.lastMessage} onClick={() => setSelectedConversation(conversation)}/>

                    )
                })}
            </div>
            }
        </div>
        <div className="chat">
            {selectedConversation  ?
            <>
                <div className="chatHead">
                    <div className="chatHeadProfileSec">
                        <MdOutlineKeyboardArrowLeft className='backArrowIcon' onClick={() => setSelectedConversation(null)} />
                        <div className="profileWrapper">
                            <img src={otherUserInChat?.profileImg || "https://static.vecteezy.com/system/resources/previews/024/766/958/non_2x/default-male-avatar-profile-icon-social-media-user-free-vector.jpg"} alt="" />
                        </div>
                        <div className="profileInfo">
                            <span className='chatName'>{otherUserInChat?.userName}</span>
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
                    {messages? (
                        messages.map((msg)=>{
                            const senderId= typeof msg.sender==="object"? msg.sender._id : msg.sender;
                            const isMe=senderId && loggedUserData?._id && senderId.toString() === loggedUserData._id.toString();
                            return(
                            <Message key={msg._id} sender={isMe ? "me" : "other"} text={msg.text} createdAt={msg.createdAt}/>
                            );
                        })
                    ): <p>Loading messages...</p>}
                    <div ref={bottomRef} />
                </div>
                <div className="chatInputSec">
                    <BsEmojiSmile className='emojiIcon'/>
                    <input onChange={handleMessageInput} onKeyDown={(e)=>
                    {
                        if(e.key==='Enter' && messageInput.trim()){
                            sendMessageMutate({
                                conversationId: selectedConversation._id,
                                text: messageInput,
                            })
                        }

                    }
                    } value={messageInput} type="text" placeholder='Type a message'/>
                    <IoIosAttach  className='attachIcon' onClick={() => fileInputRef.current.click()}/>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
                    <div className="btn" 
                        onClick={()=>{ 
                            if (!messageInput.trim() || !selectedConversation?._id) return;

                            sendMessageMutate({
                                conversationId: selectedConversation._id,
                                text: messageInput,
                            })
                        }}>
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