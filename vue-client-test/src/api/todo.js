import axiosClient from "../config/axios";
import { getTokenApi } from "../api/token";

const token = getTokenApi();

export async function getTodosAPI() {
  try {
    const { data } = await axiosClient("/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createTodoAPI(formData) {
  const { title, detail } = formData;

  const newTodo = {
    title,
    detail,
  };

  try {
    await axiosClient.post("/todos", newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateTodoAPI(formData) {
  const { title, detail } = formData;

  const newTodo = {
    title,
    detail,
  };

  try {
    const { data } = await axiosClient.put("/todos", newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}