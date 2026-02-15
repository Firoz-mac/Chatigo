import api from './axios';
export const fetchConversations=async()=>{
    const res=await api.get("/conversations");
    return res.data.data;
};