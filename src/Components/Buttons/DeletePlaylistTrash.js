import '../../App.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlaylistModal } from '../../context/playlist-context';

const DeletePlaylistTrashButton = () => {
	const { modalDispatch } = usePlaylistModal();
	return (
		<div
			onClick={() =>
				modalDispatch({
					type: 'SHOW_HIDE_DELETE_PLAYLIST_MODAL',
					value: true
				})}>
			<FontAwesomeIcon className='delete-playlist' icon={faTrash} />
		</div>
	);
};

export default DeletePlaylistTrashButton;
