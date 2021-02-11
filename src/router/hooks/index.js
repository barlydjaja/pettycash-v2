import beforeEach from "./before-each";

export default (router) => {
  Object.keys(beforeEach).forEach((key) => [
    router.beforeEach(beforeEach[key]),
  ]);
};
