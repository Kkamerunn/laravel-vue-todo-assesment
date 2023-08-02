import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      todoUpdate: {
        title: "",
        detail: "",
      },
      todosList: [],
    };
  },
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
  actions: {
    addTodoUpdate(ctx, todoUpdate) {
      ctx.commit("setTodoUpdate", todoUpdate);
    },
    addTodosList(ctx, todos) {
      ctx.commit("setTodosList", todos);
    },
  },
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
