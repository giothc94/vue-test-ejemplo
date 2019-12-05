import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { dollarFilter, percentFilter } from "./utils/filters/index";
import "bootstrap";
import Chartkick from "vue-chartkick";
import { Chart } from "chart.js";
import { VueSpinners } from "@saeris/vue-spinners";

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.use(VueSpinners);
Vue.use(Chartkick.use(Chart));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
