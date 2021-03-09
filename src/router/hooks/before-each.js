import EventSerivce from "@/services/PettyCashService";

export default {
  auth(to, from, next) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      EventSerivce.loggedIn()
        .then(() => next())
        .catch(() => {
          sessionStorage.setItem("redirectPath", to.path);
          next({ name: "Login" });
        });
    } else {
      next();
    }
  },
};
