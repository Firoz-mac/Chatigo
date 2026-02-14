import api from './axios';

export const fetchSearchingUsers=async(userName)=>{
    const res=await api.get(`/users/searchUsers?userName=${userName}`);
    return res.data.data;
}