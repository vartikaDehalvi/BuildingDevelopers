import axios from 'axios';
import { setAlert } from './alert';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load User if it already has the token
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) setAuthToken(localStorage.token);

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

//Register
export const register =
	({ name, email, password }) =>
	// 1. Set the request headers for the API call.
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// 2. Prepare the request body as a JSON string.
		const body = JSON.stringify({
			name,
			email,
			password,
		});
		try {
			const res = await axios.post('/api/users', body, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data, // token for successful response
			});
			console.log(res.data);
			dispatch(loadUser()); // So it runs immediately

			// Check if a success message is included in the response
			if (res.data.msg) {
				dispatch(setAlert(res.data.msg, 'success')); // Dispatch success alert
			}
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({ type: REGISTER_FAIL });
		}
	};

//Login
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({
		email,
		password,
	});
	try {
		const res = await axios.post('/api/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data, // token for successful response
		});

		dispatch(loadUser());

		// Check if a success message is included in the response
		if (res.data.message) {
			dispatch(setAlert(res.data.message, 'success')); // Dispatch success alert
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({ type: LOGIN_FAIL });
	}
};

//Logout/Clear Profile
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
