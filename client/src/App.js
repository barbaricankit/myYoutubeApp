import './App.css';
import { VideoListing } from './Components/VideoListing/VideoListing';
import VideoPage from './Components/VideoPage/VideoPage';
import Header from './Components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Library from './Components/Library/Library';
import VerticalNavBar from './Components/Navigation/VerticalNavBar';
import LikedVideos from './Components/Library/LikedVideos/LikedVideos';
import WatchLaterPage from './Components/Library/WatchLater/WatchLaterPage';
import PlayListPage from './Components/Library/PlayList/PlayListPage';
import HistoryPage from './Components/Library/History/HistoryPage';
import SignIn from './Components/Auth/SignIn';
import SignUpPage from './Components/Auth/SignUp';

export default function App() {
	return (
		<div className='App'>
			<Header />

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
						<PlayListPage />
					</div>
				</Route>
				<Route path='/liked-videos'>
					<div className='main-content'>
						<VerticalNavBar />
						<LikedVideos />
					</div>
				</Route>
				<Route path='/watch-later'>
					<div className='main-content'>
						<VerticalNavBar />
						<WatchLaterPage />
					</div>
				</Route>
				<Route path='/history'>
					<div className='main-content'>
						<VerticalNavBar />
						<HistoryPage />
					</div>
				</Route>
				<Route path='/library'>
					<div className='main-content'>
						<VerticalNavBar />
						<Library />
					</div>
				</Route>
				<Route path='/signin'>
					<SignIn />
				</Route>
				<Route path='/signup'>
					<SignUpPage />
				</Route>
			</Routes>
		</div>
	);
}
