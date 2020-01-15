import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterLogs, clearFilter } from '../../actions/logActions';

const SearchBar = ({ filterLogs, clearFilter }) => {
	const text = useRef('');

	// useEffect(() => {
	// 	if()
	// })

	const onChange = e => {
		if (text.current.value !== '') {
			filterLogs(text.current.value);
		} else {
			clearFilter();
		}
	};

	return (
		<nav style={{ marginBottom: '30px' }} className="blue">
			<div className="nav-wrapper">
				<form onSubmit={e => e.preventDefault()}>
					<div className="input-field">
						<input
							ref={text}
							id="search"
							type="search"
							placeholder="Search logs..."
							onChange={onChange}
						/>

						<label className="label-icon" htmlFor="search">
							<i className="material-icons">search</i>
						</label>
						<i className="material-icons">close</i>
					</div>
				</form>
			</div>
		</nav>
	);
};

SearchBar.propTypes = {
	filterLogs: PropTypes.func.isRequired,
	clearFilter: PropTypes.func.isRequired
};

export default connect(null, { filterLogs, clearFilter })(SearchBar);
