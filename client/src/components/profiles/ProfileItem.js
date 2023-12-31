import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills,
	},
}) => {
	return (
		<div className="profile bg-light">
			<img src={avatar} alt="" className="round-img" />
			<div>
				<h2>{name}</h2>
				<p>
					{status}
					{company && <span> at {company} </span>}{' '}
					<p className="my-1">{location && <span>{location} </span>}</p>
				</p>
				<Link to={`/profile/${_id}`} className="btn ">
					View Profile
				</Link>
			</div>
			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li
						key={index}
						style={{
							fontSize: '1rem',
							fontFamily: 'Montserrat',
							letterSpacing: '2px',
						}}
					>
						<i class="fa-solid fa-check">{skill}</i>
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileItem;
