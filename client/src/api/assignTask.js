import axiosInstance from "./axiosInstance";


export const assignTaskToUserAPI = async (payload) => {
  const res = await axiosInstance.post("/assign/assign-task", payload);
  return res.data;
};

export const getTasksByUSer = async () => {
  const res = await axiosInstance.get("/assign/get-tasks-by-user");
  return res.data;
};

export const updateTaskStatus = async (id, data) => {
    const res = await axiosInstance.patch(`/task/updateStatus/${id}`, data);
    return res.data;
};

export const getAssignTaskByUser = async (userID) => {
  const res = await axiosInstance.get(`/assign/getAssignTaskByUser/${userID}`);
  return res.data;
};