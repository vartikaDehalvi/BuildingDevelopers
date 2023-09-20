import React from 'react';
import { Link } from 'react-router-dom';

const DashBoardActions = () => {
	return (
		<div>
			<div class="dash-buttons">
				<Link
					to="/edit-profile"
					class="btn"
					style={{
						width: '25%',
						textAlign: 'center',
						height: '130%',
						boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
					}}
				>
					<i
						class="fas fa-user-circle text-primary dash-i"
						style={{ color: '#2c0b3f' }}
					></i>{' '}
					Edit Profile
				</Link>
				<Link
					to="/add-education"
					class="btn"
					style={{
						width: '25%',
						height: '130%',
						textAlign: 'center',
						boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
					}}
				>
					<i
						class="fas fa-graduation-cap text-primary"
						style={{ color: '#2c0b3f' }}
					></i>{' '}
					Add Education
				</Link>
				<Link
					to="/add-experience"
					class="btn"
					style={{
						width: '25%',
						height: '130%',
						textAlign: 'center',
						boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)',
					}}
				>
					<i
						class="fab fa-black-tie text-primary"
						style={{ color: '#2c0b3f' }}
					></i>{' '}
					Add Experience
				</Link>
			</div>
		</div>
	);
};

export default DashBoardActions;
