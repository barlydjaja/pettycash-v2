import Storage from "../components/storage/src/storage";

const storage = new Storage({
  type: "localStorage",
  prefix: "__indonesia__",
});

export default storage;
