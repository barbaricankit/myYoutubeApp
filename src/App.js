import "./App.css";
import { VideoListing } from "./Components/VideoListing";
import { VideoPage } from "./Components/VideoPage";
import { NavigationBar } from "./Components/NavigationBar";
import { PlayList } from "./Components/PlayList";
import { WatchLater } from "./Components/WatchLater";
import {Routes,Route} from "react-router-dom";
import { History } from "./Components/History";
import { Library } from "./Components/Library";
export default function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="component-details">
      <Routes>
        <Route path="/" element={<VideoListing />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/playlist/:playlistname" element={<PlayList />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/history" element={<History />} />
        <Route path="/library" element={<Library/>}/>
      </Routes>
      </div>
      
    </div>
  );
}
