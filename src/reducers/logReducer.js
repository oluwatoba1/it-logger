import {
	GET_LOGS,
	SET_LOADING,
	LOGS_ERROR,
	ADD_LOG,
	DELETE_LOG,
	UPDATE_LOG,
	SET_CURRENT,
	CLEAR_CURRENT,
	SEARCH_LOGS,
	CLEAR_LOGS
} from '../actions/types';

const initialState = {
	logs: null,
	current: null,
	loading: false,
	filtered: null,
	error: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_LOGS:
			return {
				...state,
				logs: payload,
				loading: false
			};
		case ADD_LOG:
			return {
				...state,
				logs: [...state.logs, payload],
				loading: false
			};
		case SET_CURRENT:
			return {
				...state,
				current: payload,
				loading: false
			};
		case UPDATE_LOG:
			return {
				...state,
				logs: state.logs.map(log => (log.id === payload.id ? payload : log)),
				loading: false
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case DELETE_LOG:
			return {
				...state,
				logs: state.logs.filter(log => log.id !== payload),
				loading: false
			};
		case SEARCH_LOGS:
			return {
				...state,
				filtered: state.logs.filter(log => {
					const regex = new RegExp(`${payload}`, 'gi');

					return log.message.match(regex) || log.tech.match(regex);
				}),
				loading: false
			};
		case CLEAR_LOGS:
			return {
				...state,
				filtered: null
			};
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case LOGS_ERROR:
			console.err(payload);
			return {
				...state,
				error: payload
			};
		default:
			return state;
	}
};
