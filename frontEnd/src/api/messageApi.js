import api from "./axios";

export const fetchMessages = async (conversationId) => {
  const res = await api.get(`/messages/${conversationId}`);
  return res.data.data;
};

// export const sendMessage = async (payload) => {
//   const res = await api.post("/messages/send", payload);
//   return res.data.data;
// };

export const sendMessage= async ({conversationId, text, file})=>{
  const formData = new FormData();

  formData.append("conversationId", conversationId);
  if(text){
    formData.append("text",text);
  }
  if(file){
    formData.append("file",file);
  }

  const res=await api.post("/messages/send", formData,{
    headers:{
      "Content-Type":"multipart/form-data",
    },
  });

  return res.data.data;
};