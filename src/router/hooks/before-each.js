import EventSerivce from "@/services/EventService";

export default {
  auth(to, from, next) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      EventSerivce.loggedIn()
        .then(() => next())
        .catch(() => {
          next({ name: "Login" });
        });
    } else {
      next();
    }
  },
};
