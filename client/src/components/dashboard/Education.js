import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu, index) => (
		<tr key={edu._id}>
			<td style={{ width: '25%' }}>{edu.school}</td>
			<td style={{ width: '25%' }}>{edu.degree}</td>
			<td style={{ width: '25%' }}>
				<Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
				{edu.to === null ? (
					'Now'
				) : (
					<Moment format="DD/MM/YYYY">{edu.to}</Moment>
				)}
			</td>
			<td style={{ width: '25%' }}>
				<i
					onClick={() => deleteEducation(edu._id)}
					class="fa-solid fa-xmark"
					style={{ color: '#ec4667' }}
				></i>
			</td>
		</tr>
	));
	return (
		<div style={{ textAlign: 'center' }}>
			<h2 className="my-2"> Education Credentials</h2>
			{education.length > 0 ? (
				<table>
					<tr className="table-tr" style={{ width: '100%' }}>
						<th style={{ width: '25%' }}>School</th>
						<th style={{ width: '25%' }}>Degree</th>
						<th style={{ width: '25%' }}>Years</th>
						<th style={{ width: '25%' }}>Action</th>
					</tr>

					<tbody>{educations}</tbody>
				</table>
			) : (
				<div style={{ fontSize: '100%' }}>Add Education Details</div>
			)}
		</div>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
