import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp, index) => (
		<tr style={{ width: '100%', textAlign: 'center' }} key={exp._id}>
			<td style={{ width: '25%' }}>{exp.company}</td>
			<td style={{ width: '25%' }}>{exp.title}</td>
			<td style={{ width: '25%' }}>
				<Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
				{exp.to === null ? (
					'Now'
				) : (
					<Moment format="DD/MM/YYYY">{exp.to}</Moment>
				)}
			</td>
			<td style={{ width: '25%' }}>
				<i
					onClick={() => deleteExperience(exp._id)}
					class="fa-solid fa-xmark"
					style={{ color: '#ec4667' }}
				></i>
			</td>
		</tr>
	));
	return (
		<div style={{ textAlign: 'center' }}>
			<h2 className="my-2"> Experience Credentials</h2>
			<table style={{ textAlign: 'center' }}>
				<tr className="table-tr">
					<th>Company</th>
					<th>Title</th>
					<th>Years</th>
					<th>Action</th>
				</tr>
				{experiences}
			</table>
		</div>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
