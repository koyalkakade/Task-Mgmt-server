import axiosInstance from "./axiosInstance";

export const createTASK =async (payload) => {
const res = await axiosInstance.post("/task/createTask", payload)
    return res.data
}

export const getAllTASKS = async () => {
  const res = await axiosInstance.get("/task/getAllTask");
  return res.data;
};

export const deleteTASK = async (id) => {
  const res = await axiosInstance.delete(`/task/delete/${id}`);
  return res.data;
};

export const getTaskById = async (ID) => {
  const res = await axiosInstance.get(`/task/getTask/${ID}`);
  return res.data;
};

export const updateTask = async (id,payload) => {
  const res = await axiosInstance.put(`/task/updateTask/${id}`, payload);
    return res.data;
};