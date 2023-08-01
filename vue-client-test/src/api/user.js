import axiosClient from "../config/axios";
import { getTokenApi } from "./token";

export const registerAPI = async (formData) => {
  const { email, name, password, repeatPassword } = formData;

  const newUserData = {
    name,
    email,
    password,
    password_confirmation: repeatPassword,
  };

  try {
    const { data } = await axiosClient.post("/register", newUserData);
    localStorage.setItem("AUTH_TOKEN", data.token);
  } catch (error) {
    console.log(error);
  }
};

export async function loginAPI(formData) {
  const { email, password } = formData;

  const userData = {
    email,
    password,
  };

  try {
    const { data } = await axiosClient.post("/login", userData);
    localStorage.setItem("AUTH_TOKEN", data.token);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function logoutAPI() {
  const token = getTokenApi();
  try {
    await axiosClient.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.removeItem("AUTH_TOKEN");
  } catch (err) {
    console.log(err);
  }
}
