import Cookies from "js-cookie";

export default (context) => {
  let previousPath = null;

  context.app.router.beforeEach((to, from, next) => {
    previousPath = from.fullPath;
    next();
  });

  context.app.router.beforeEach((to, from, next) => {
    const token = Cookies.get("token");

    if (token) {
      if (to.path === "/login") {
        return next(previousPath || "/");
      }
    } else {
      if (to.path !== "/login") {
        return next("/login");
      }
    }

    next();
  });
};
