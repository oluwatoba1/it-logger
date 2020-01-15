import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import PreLoader from '../layout/PreLoader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading, filtered }, getLogs }) => {
	useEffect(() => {
		getLogs();
		//  eslint-disable-next-line
	}, []);

	if (loading || logs === null) {
		return <PreLoader />;
	}

	return (
		<ul className="collection with-header">
			<li className="collection-header">
				<h4 className="center">System Logs</h4>
			</li>
			{!loading && logs.length === 0 ? (
				<p className="center">No logs to show</p>
			) : filtered ? (
				filtered.map(log => <LogItem log={log} key={log.id} />)
			) : (
				logs.map(log => <LogItem log={log} key={log.id} />)
			)}
		</ul>
	);
};

Logs.propTypes = {
	log: PropTypes.object.isRequired,
	filtered: PropTypes.object,
	getLogs: PropTypes.func.isRequired
};

//	`state.log` is from our index reducer (reducers/index.js)

const mapStateToProps = state => ({
	log: state.log,
	filtered: state.log.filtered
});

//	Another way to go about it

// const mapStateToProps = state => ({
// 	logs: state.log.logs,
// 	loading: state.log.loading
// })

export default connect(mapStateToProps, { getLogs })(Logs);
