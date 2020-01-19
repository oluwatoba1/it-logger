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
} from './types';

// export const getlogs = () => {
// 	return async dispatch => {
// 		setLoading();

// 		const res = await fetch('/logs');
// 		const data = await res.json();

// 		dispatch({
// 			type: GET_LOGS,
// 			payload: data
// 		});
// 	};
// };

//  A more efficient way is:

//  Get logs from server
export const getLogs = () => async dispatch => {
	try {
		setLoading();

		const res = await fetch('/logs');
		const data = await res.json();

		dispatch({
			type: GET_LOGS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: LOGS_ERROR,
			payload: error.response.statusText
		});
	}
};

//	Add a new log
export const addLog = log => async dispatch => {
	try {
		setLoading();

		const res = await fetch('/logs', {
			method: 'POST',
			body: JSON.stringify(log),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		dispatch({
			type: ADD_LOG,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: LOGS_ERROR,
			payload: error.response.statusText
		});
	}
};

//	Set current
export const setCurrent = log => {
	return {
		type: SET_CURRENT,
		payload: log
	};
};

//	Update logs
export const updateLog = log => async dispatch => {
	try {
		setLoading();

		const res = await fetch(`/logs/${log.id}`, {
			method: 'PUT',
			body: JSON.stringify(log),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		dispatch({
			type: UPDATE_LOG,
			payload: data
		});

		clearCurrent();
	} catch (error) {
		dispatch({
			type: LOGS_ERROR,
			payload: error.response.statusText
		});
	}
};

//	Delete log from server
export const deleteLog = id => async dispatch => {
	try {
		setLoading();

		await fetch(`/logs/${id}`, {
			method: 'DELETE'
		});

		dispatch({
			type: DELETE_LOG,
			payload: id
		});
	} catch (error) {
		dispatch({
			type: LOGS_ERROR,
			payload: error.response.statusText
		});
	}
};

export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT
	};
};

export const filterLogs = text => async dispatch => {
	try {
		dispatch({
			type: SEARCH_LOGS,
			payload: text
		});
	} catch (error) {
		dispatch({
			type: LOGS_ERROR,
			payload: error.response.statusText
		});
	}
};

export const clearFilter = () => {
	return {
		type: CLEAR_LOGS
	};
};

export const setLoading = () => {
	return {
		type: SET_LOADING
	};
};
