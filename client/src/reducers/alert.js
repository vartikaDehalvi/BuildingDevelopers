import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload];

		case REMOVE_ALERT:
			/*REMOVE_ALERT filters through and returns all alerts except for the one that matches the payload*/
			return state.filter((alert) => alert.id !== payload);

		default:
			return state;
	}
}
