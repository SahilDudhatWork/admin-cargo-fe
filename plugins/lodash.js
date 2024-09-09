import Vue from "vue";
import lodash from "lodash";
import debounce from "lodash/debounce";

Vue.prototype.$lodash = lodash;
Vue.prototype.$debounce = debounce;
