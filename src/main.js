import { createApp } from "vue";
import { router } from "./router";
import "./style.css";
import { createPinia } from "pinia";
import "element-plus/dist/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
