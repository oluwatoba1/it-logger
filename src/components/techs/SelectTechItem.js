import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';

const SelectTechItem = ({ tech: { techs, loading }, getTechs }) => {
	useEffect(() => {
		getTechs();
		//	eslint-disable-next-line
	}, []);

	if (techs !== null && techs.length === 0 && !loading) {
		return <option value="">No technician has been created</option>;
	}

	return (
		<Fragment>
			<option value="" disabled>
				Select Technician
			</option>
			{techs !== null &&
				!loading &&
				techs.map(tech => (
					<option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
						{tech.firstName + ' ' + tech.lastName}
					</option>
				))}
		</Fragment>
	);
};

SelectTechItem.propTypes = {
	tech: PropTypes.object
};

const mapStateToProps = state => ({
	tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(SelectTechItem);
