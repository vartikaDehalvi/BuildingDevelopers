import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Alert = ({ alerts }) => {
	alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.alertType}`}>
				{alert.msg}
			</div>
		));
};

Alert.proptypes = {
	alerts: PropTypes.array.isRequired,
};
const mapSateToProps = (state) => ({
	alerts: state.alerts,
});

export default connect(mapSateToProps)(Alert);
