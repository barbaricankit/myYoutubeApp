import "./App.css";
import { VideoListing } from "./Components/VideoListing";
import VideoPage from "./Components/VideoPage";
import NavigationBar from "./Components/NavigationBar";
import PlayList from "./Components/PlayList";
import { WatchLater } from "./Components/WatchLater";
import { Routes, Route } from "react-router-dom";
import { History } from "./Components/History";
import Library from "./Components/Library";
import VerticalNavBar from "./Components/VerticalNavBar";

export default function App() {
  return (
    <div className='App'>
      <NavigationBar />

      <Routes>
        <Route path='/'>
          <div className='main-content'>
            <VerticalNavBar />
            <VideoListing />
          </div>
        </Route>
        <Route path='/video/:videoId' element={<VideoPage />} />
        <Route path='/playlist/:playlistname'>
          <div className='main-content'>
            <VerticalNavBar />
            <PlayList />
          </div>
        </Route>
        <Route path='/watch-later'>
          <div className='main-content'>
            <VerticalNavBar />
            <WatchLater />
          </div>
        </Route>
        <Route path='/history'>
          <div className='main-content'>
            <VerticalNavBar />
            <History />
          </div>
        </Route>
        <Route path='/library'>
          <div className='main-content'>
            <VerticalNavBar />
            <Library />
          </div>
        </Route>
      </Routes>
    </div>
  );
}
