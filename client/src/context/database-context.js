import { createContext, useContext, useEffect, useState } from "react";
import { callServer } from "../API/api_call";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    (async () => {
      const {
        data: { videos },
      } = await callServer({
        url: "videos",
        type: "GET",
      });

      setVideoList((prevList) =>
        videos.map((video) => ({
          ...video,
          playlists: [],
          watchlater: false,
          liked: false,
          disliked: false,
        }))
      );
    })();
  }, []);
  return (
    <DataContext.Provider value={{ videoList }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
