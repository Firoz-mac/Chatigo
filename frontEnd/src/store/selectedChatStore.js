import {create} from "zustand";

const selectedChatStore=create((set)=>({
    selectedConversation:null,
    setSelectedConversation:(conversation)=>set({
        selectedConversation:conversation
    }),
}));

export default selectedChatStore;