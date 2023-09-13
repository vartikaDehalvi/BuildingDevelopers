import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
	experience: { company, title, location, current, to, from, description },
}) => {
	return (
		<div style={{ lineHeight: '250%' }}>
			{company && (
				<h3 className="text-dark">
					<strong>{company}</strong>
				</h3>
			)}
			<h3>
				<Moment format="DD/MM/YYYY">{from}</Moment> -
				{!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}
			</h3>

			{title && (
				<h3>
					<strong style={{ fontWeight: 'bolder', fontSize: '115%' }}>
						Position:
					</strong>{' '}
					{title}
				</h3>
			)}
			{description && (
				<h3>
					<strong style={{ fontWeight: 'bolder', fontSize: '115%' }}>
						Description:
					</strong>{' '}
					{description}
				</h3>
			)}
		</div>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
