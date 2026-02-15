import api from './axios';
export const fetchConversations=async()=>{
    const res=await api.get("/conversations");
    return res.data.data;
};

export const createOrGetConversation = async (receiverId) => {
    const res = await api.post("/conversations", { receiverId });
    return res.data.data;
};