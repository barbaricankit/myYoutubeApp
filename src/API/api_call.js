import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();
const instance = axios.create({
  baseURL: "process.env.REACT_APP_BASE_URL",
});
export const callServer = async ({ url, type, body }) => {
  try {
    switch (type) {
      case "GET":
        const getData = await instance.get(url);
        return getData;

      case "POST":
        const postData = await instance.post(url, body);
        return postData;

      default:
        break;
    }
  } catch (error) {
    console.log("Fail to get or post Data from Server", error.message);
  }
};
