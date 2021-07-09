import '../../App.css';
import { usePlaylist } from '../../context/video-context';
import { usePlaylistModal } from '../../context/playlist-context';
import { useAuth } from '../../context/auth-context';
import { callServer } from '../../API/api_call';
import { useNavigate } from 'react-router-dom';

const AddToWatchLater = ({ id }) => {
	const { state: { watchlater }, dispatch } = usePlaylist();
	const { modalDispatch, manageToast } = usePlaylistModal();
	const { authState: { userId, login } } = useAuth();
	const navigate = useNavigate();

	const manageWatchLater = async () => {
		const { data } = await callServer({
			url: `/${userId}/watchlater`,
			type: 'POST',
			body: { videoId: id }
		});
		if (data.success) {
			dispatch({
				type: 'ADD_TO_WATCH_LATER',
				value: { addOrRemove: !watchLater, video_id: id }
			});
			modalDispatch({ type: 'ADD_TO_WATCH_LATER' });
			manageToast();
		} else {
			console.log("Something went wrong! Couldn't add video to watchlater");
		}
	};
	const watchLater = watchlater.includes(id);

	return (
		<div className='playlist'>
			<label className='playlist_label'>
				<input
					type='checkbox'
					checked={watchLater}
					onChange={() => (login ? manageWatchLater() : navigate('/signin'))}
				/>
				<span className='playlist_name'>Watch Later</span>
			</label>
		</div>
	);
};

export default AddToWatchLater;
