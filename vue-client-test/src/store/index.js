import { createStore } from "vuex";

// Create the vuex's store
const store = createStore({
  // Declare all the properties we are using at the app
  state() {
    return {
      todoUpdate: {
        title: "",
        detail: "",
      },
      todosList: [],
    };
  },
  // Define all the mutations through which we mutate all the state's properties
  mutations: {
    setTodoUpdate(state, payload) {
      state.todoUpdate = {
        title: payload.title,
        detail: payload.detail,
      };
    },
    setTodosList(state, payload) {
      state.todosList = payload;
    },
  },
  // Here we define all the actions that indeed call the activate all the mutations
  actions: {
    addTodoUpdate(ctx, todoUpdate) {
      ctx.commit("setTodoUpdate", todoUpdate);
    },
    addTodosList(ctx, todos) {
      ctx.commit("setTodosList", todos);
    },
  },
  // Here we define all the getters we use to consume the state's properties at the app
  getters: {
    getTodoUpdate({ todoUpdate }) {
      return todoUpdate;
    },
    getTodosList({ todosList }) {
      return todosList;
    },
  },
});

export default store;
