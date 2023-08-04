import axiosClient from "../config/axios";
import { getTokenApi, deleteTokenApi, setTokenApi } from "./token";

// The register method for the user to sign up
export const registerAPI = async (formData) => {
  // Get all the form fields values
  const { email, name, password, repeatPassword } = formData;

  // Saving the form fields values in a new object
  const newUserData = {
    name,
    email,
    password,
    password_confirmation: repeatPassword,
  };

  // Send the request to the API with the data from the form fields values
  // and finally save the returned token to the localstorage
  const { data } = await axiosClient.post("/register", newUserData);
  setTokenApi(data.token);
};

// Sign in method
export async function loginAPI(formData) {
  // Get all the form fields values
  const { email, password } = formData;

  // Saving the form fields values in a new object
  const userData = {
    email,
    password,
  };

  // Send the request to the API with the data from the form fields values
  // and finally save the returned token to the localstorage
  const { data } = await axiosClient.post("/login", userData);
  setTokenApi(data.token);
}

// Log out method
export async function logoutAPI() {
  // Get the authenticated user token
  const token = getTokenApi();

  // Send the request to the API to delete the token and remove it from the localstorage
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
