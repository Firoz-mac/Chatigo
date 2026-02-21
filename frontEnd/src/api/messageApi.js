import api from "./axios";

export const fetchMessages = async (conversationId) => {
  const res = await api.get(`/messages/${conversationId}`);
  return res.data.data;
};

export const sendMessage = async (payload) => {
  const res = await api.post("/messages/send", payload);
  return res.data.data;
};