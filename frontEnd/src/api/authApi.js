import api from './axios';
export const fetchLoggedUserData=async()=>{
    const res=await api.get('/auth/userData');
    return res.data.data;
};