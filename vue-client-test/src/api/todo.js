import axiosClient from "../config/axios";
import { getTokenApi } from "../api/token";

export async function getTodosAPI() {
  const token = getTokenApi();
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
  const token = getTokenApi();
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

export async function updateTodoAPI(formData, id) {
  const token = getTokenApi();
  const { title, detail } = formData;

  const newTodo = {
    title,
    detail,
  };

  try {
    const { data } = await axiosClient.put(`/todos/${id}`, newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodoAPI(id) {
  const token = getTokenApi();
  try {
    await axiosClient.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
