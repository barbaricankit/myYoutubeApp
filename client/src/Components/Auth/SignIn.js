import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReducer } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { callServer } from '../../API/api_call';
import { useAuth } from '../../context/auth-context';
import { usePlaylist } from '../../context/video-context';
import { manageLoginReducer } from './login-reducer';
const initialState = {
	username: '',
	password: '',
	showPassword: false,
	incorrectPassword: false
};
const SignIn = () => {
	const { authDispatch } = useAuth();
	const navigate = useNavigate();
	const { dispatch } = usePlaylist();
	const [ { username, password, showPassword, incorrectPassword }, loginDispatch ] = useReducer(
		manageLoginReducer,
		initialState
	);
	const loginHandler = async () => {
		const { data } = await callServer({
			url: '/signin',
			type: 'POST',
			body: { username, password }
		});
	
		if (data.success) {
			const {
				userId,
				likedVideos,
				dislikedVideos,
				playlists: playLists,
				watchlater,
				historyVideos,
				userInitials
			} = data;
			const serverData = {
				userId,
				likedVideos,
				dislikedVideos,
				playLists,
				watchlater: watchlater?.videoIds,
				historyVideos,
				userInitials
			};
		
			authDispatch({ type: 'SET_USER_ID', value: { userId, userInitials } });
			dispatch({ type: 'UPDATE_INITIAL_STATE', value: serverData });
			loginDispatch({ type: 'UPDATE_INCORRECT_PASSWORD', value: false });
			localStorage.setItem(
				'user_video_lib',
				JSON.stringify({
					...serverData,
					isUserLoggedIn: true
				})
			);
			navigate('/');
		} else {
			loginDispatch({ type: 'UPDATE_INCORRECT_PASSWORD', value: true });
		}
	};

	return (
		<div className='signin-form'>
			<div className='h1'>Sign In</div>

			<div>
				<label className='text-label'>
					Username<span className='red-color'>*</span>
				</label>
				<div>
					<input
						className='textbox'
						type='text'
						placeholder='Enter Username'
						value={username}
						onChange={(e) => loginDispatch({ type: 'UPDATE_USERNAME', value: e.target.value })}
					/>
				</div>
				<br />
				<label className='text-label'>
					Enter Password<span className='red-color'>*</span>
				</label>
				<div className='password-textbox'>
					<input
						className='textbox'
						type={showPassword ? 'text' : 'password'}
						placeholder='Enter Password'
						value={password}
						onChange={(e) => loginDispatch({ type: 'UPDATE_PASSWORD', value: e.target.value })}
					/>
					{incorrectPassword && <span class='error-text'>Incorrect Password</span>}
					<span className='btn-show-password' onClick={() => loginDispatch({ type: 'UPDATE_SHOW_PASSWORD' })}>
						<FontAwesomeIcon icon={faEye} size='1x' />
					</span>
				</div>
				<br />
			</div>
			<button className='btn-primary btn-bg-color' onClick={() => loginHandler()}>
				Sign In
			</button>
			<p>
				New User? Click to <NavLink to='/signup'>Sign Up</NavLink>
			</p>
		</div>
	);
};

export default SignIn;
