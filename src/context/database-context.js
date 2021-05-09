import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const dotenv = require("dotenv");
dotenv.config();
const DataContext = createContext();

const options = {
  method: "GET",
  url: process.env.REACT_APP_URL,
};
export const DataProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { items },
        } = await axios.request(options);

        setVideoList((prevList) =>
          items.map((video) => ({
            ...video,
            playlists: [],
            watchlater: false,
            liked: false,
            disliked: false,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <DataContext.Provider value={{ videoList }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
