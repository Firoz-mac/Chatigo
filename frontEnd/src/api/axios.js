import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

//automatically add token to headers
api.interceptors.request.use((config) => {

    try {
        const stored = localStorage.getItem("chatigo");
        const token = stored ? JSON.parse(stored).token : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }catch (err) {
        console.error("Invalid auth data in localStorage",err);
    }
    
    return config;
});

export default api;