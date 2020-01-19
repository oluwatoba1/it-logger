import {
	GET_TECHS,
	ADD_TECH,
	DELETE_TECH,
	TECHS_ERROR
} from '../actions/types';

const initialState = {
	techs: null,
	loading: false,
	error: null
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_TECHS:
			return {
				...state,
				techs: payload,
				loading: false
			};
		case ADD_TECH:
			return {
				...state,
				techs: [...state.techs, payload],
				loading: false
			};
		case DELETE_TECH:
			return {
				...state,
				techs: state.techs.filter(tech => tech.id !== payload),
				loading: false
			};
		case TECHS_ERROR:
			console.error(payload);

			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
};
