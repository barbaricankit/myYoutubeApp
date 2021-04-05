import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();
const options = {
  method: "GET",
  url:"https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&key=AIzaSyBaKOviqO4JBR2O4f5MSze0v-DijMGSEUw&maxResults=50"
    
};
export const DataProvider = ({ children }) => {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { items }
        } = await axios.request(options);
        console.log(items)
        setVideoList((prevList) => items.map(video=>({...video,playlists:[],watchlater:false,liked:false,disliked:false})));
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
