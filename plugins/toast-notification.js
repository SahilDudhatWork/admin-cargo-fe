import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; 

Vue.use(VueToast);

export default (context, inject) => {
  inject('toast', {
    open(options = {}) {
      const { message, type = 'success' } = options;
      Vue.$toast.open({
        message: message || 'No message provided',
        type,
        duration: 2000,
        position: 'bottom-right',
      });
    },
  });
};
