import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
	profile: {
		bio,
		skills,
		user: { name },
	},
}) => {
	return (
		<div>
			<div className="profile-about bg-light p-2">
				<h2
					style={{
						fontWeight: '800',
						letterSpacing: '1.7px',
						fontSize: '2rem',
						color: 'rgb(30, 0, 50)',
						textTransform: 'uppercase',
					}}
				>
					{' '}
					About {name.trim().split(' ')[0]}{' '}
				</h2>
				{bio && (
					<>
						<p className="text-primary">{bio}</p>
					</>
				)}
				<div className="line"></div>
				<h2 className="text-primary">Skill Set</h2>
				<div className="skills">
					{skills.map((skill, index) => (
						<>
							<div
								key={index}
								style={{ textTransform: 'capitalize' }}
								class="p-1"
							>
								<i class="fa-solid fa-check"></i> {skill}
							</div>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
