import axiosClient from "../config/axios";
import { getTokenApi } from "../api/token";

// Fetch todos method
export async function getTodosAPI() {
  // Get the authenticated token
  const token = getTokenApi();

  // Fetch todos from the API
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

// Create new todos method
export async function createTodoAPI(formData) {
  // Get the authenticated token
  const token = getTokenApi();

  // Extract all the data from the form fields
  const { title, detail } = formData;

  // Save the form fields values in a new object
  const newTodo = {
    title,
    detail,
  };

  // Send the values to the API
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

// Update todos method
export async function updateTodoAPI(formData, id) {
  // Get the authenticated token
  const token = getTokenApi();

  // Extract all the data from the form fields
  const { title, detail } = formData;

  // Save the form fields values in a new object
  const newTodo = {
    title,
    detail,
  };

  // Send the values to the API
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

// Delete todo method
export async function deleteTodoAPI(id) {
  // Get the authenticated token
  const token = getTokenApi();

  // Delete todo from the API
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
