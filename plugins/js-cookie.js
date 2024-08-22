import Cookies from 'js-cookie';

export default (context, inject) => {
  inject('cookies', Cookies);
};
