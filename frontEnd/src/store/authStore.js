import {create} from "zustand";

const authStore=create((set)=>({
    user: null,
    token: null,

    login:(userData,token)=> set(()=>({
        user: userData,
        token: token
    })),

    logout:()=>
        set(()=>({
            user:null,
            token:null
        }))
}));

export default authStore;