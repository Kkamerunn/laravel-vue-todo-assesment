import axiosClient from "../config/axios";
import { getTokenApi, deleteTokenApi, setTokenApi } from "./token";

export const registerAPI = async (formData) => {
  const { email, name, password, repeatPassword } = formData;

  const newUserData = {
    name,
    email,
    password,
    password_confirmation: repeatPassword,
  };

  const { data } = await axiosClient.post("/register", newUserData);
  setTokenApi(data.token);
};

export async function loginAPI(formData) {
  const { email, password } = formData;

  const userData = {
    email,
    password,
  };

  const { data } = await axiosClient.post("/login", userData);
  setTokenApi(data.token);
}

export async function logoutAPI() {
  const token = getTokenApi();
  try {
    await axiosClient.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    deleteTokenApi();
  } catch (err) {
    console.log(err);
  }
}
