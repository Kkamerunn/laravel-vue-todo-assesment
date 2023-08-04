import { createApp } from "vue";
//import "./style.css";
import App from "./App.vue"; // Import the main app component
import router from "./router"; // Import the router library
import store from "./store"; // Import the vuex store library

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Here we configure vuetify framework
const vuetify = createVuetify({
  components,
  directives,
});

// Here we add all the tools we use in the app
createApp(App).use(router).use(vuetify).use(store).mount("#app");
