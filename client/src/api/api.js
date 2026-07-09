import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const res = await axiosInstance.post("/user/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const loginUser = async (loginData) => {
  const res = await axiosInstance.post("/user/login", loginData);
  console.log(res)
  return res.data;
};

export const getUserInfo = async () => {
  const res = await axiosInstance.get("/user/getUserInfo")
  return res.data
}

export const getAllTask = async () => {
  const res = await axiosInstance.get("/task/getAllTask")
  return res.data
}

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/user/getAllUser");
  return res.data;
};

export const changePasswordAPI = async (id, pass) => {
  // console.log('////////////////')
  const res = await axiosInstance.patch(`/user/changePassword/${id}`, { pass: pass });
  return res.data;
};

export const sendOTP = async (email) => {
 const res = await axiosInstance.post("/user/send-otp", { email });
  return res.data;
};

export const verifyOTP = async (email, otp) => {
  const res = await axiosInstance.post("/user/verify-otp", { email, otp });
  return res.data;
};
//
export const changePassword = async (email, pass) => {
  // console.log('////////////////')
  const res = await axiosInstance.patch(`/user/changePasswordOTP`, { email:email,pass: pass });
  return res.data;
};
