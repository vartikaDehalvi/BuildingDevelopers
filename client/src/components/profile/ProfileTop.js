import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({
	profile: {
		status,
		company,
		location,
		website,
		social: [{ twitter, facebook, linkedin, youtube, instagram }],
		user: { name, avatar },
	},
}) => {
	return (
		<div>
			<div
				className="profile-top bg-primary p-2"
				style={{
					borderRadius: '2%',
					backgroundColor: 'rgba(256,256,256, 0.4)',
				}}
			>
				<img className="round-img my-1" src={avatar} alt="" />
				<h1 style={{ textTransform: 'capitalize' }} className="large">
					{name}
				</h1>
				<p style={{ textTransform: 'capitalize' }} className="lead">
					{status}
					{company && <span> at {company} </span>}
				</p>
				<p style={{ textTransform: 'capitalize' }}>
					{location && <span> {location} </span>}
				</p>
				<div className="icons my-1" style={{ color: 'blueviolet' }}>
					{website && (
						<Link
							to={website.startsWith('http') ? website : `http://${website}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fas fa-globe fa-2x"></i>
						</Link>
					)}
					{twitter && (
						<>
							<Link
								to={twitter.startsWith('http') ? twitter : `http://${twitter}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i class="fa-brands fa-twitter fa-2x"></i>{' '}
							</Link>
						</>
					)}
					{facebook && (
						<Link
							to={facebook.startsWith('http') ? facebook : `http://${facebook}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-facebook fa-2x"></i>
						</Link>
					)}
					{linkedin && (
						<>
							<Link
								to={
									linkedin.startsWith('http') ? linkedin : `http://${linkedin}`
								}
								target="_blank"
								rel="noopener noreferrer"
							>
								<i class="fa-brands fa-2x fa-linkedin"></i>{' '}
							</Link>
						</>
					)}
					{youtube && (
						<Link
							to={youtube.startsWith('http') ? youtube : `http://${youtube}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fa-brands fa-2x fa-youtube"></i>{' '}
						</Link>
					)}
					{instagram && (
						<Link
							to={
								instagram.startsWith('http') ? instagram : `http://${instagram}`
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fa-brands fa-2x fa-instagram"></i>{' '}
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
