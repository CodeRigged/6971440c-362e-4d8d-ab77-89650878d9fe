import axios from "axios";
const server = axios.create({
  baseURL: "https://teclead-ventures.github.io",
});

export default server;
