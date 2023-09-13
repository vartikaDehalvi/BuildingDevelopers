import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
	education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
	return (
		<div style={{ lineHeight: '250%' }}>
			{school && (
				<h3 className="text-dark">
					<strong>{school}</strong>
				</h3>
			)}
			<h3>
				<Moment format="DD/MM/YYYY">{from}</Moment> -
				{!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}
			</h3>

			{degree && (
				<h3>
					<strong style={{ fontWeight: 'bolder', fontSize: '115%' }}>
						Degree:
					</strong>{' '}
					{degree}
				</h3>
			)}
			{fieldofstudy && (
				<h3>
					<strong style={{ fontWeight: 'bolder', fontSize: '115%' }}>
						Field Of Study:
					</strong>{' '}
					{fieldofstudy}
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

ProfileEducation.propTypes = {
	education: PropTypes.array.isRequired,
};

export default ProfileEducation;
