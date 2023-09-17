import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = ({ getProfileById, auth, profile: { loading, profile } }) => {
	const { id } = useParams();
	useEffect(() => {
		if (id) {
			getProfileById(id);
		}
	}, [getProfileById, id]);

	if (!profile || loading) {
		return <Spinner />;
	}

	return (
		<div className="profile-container">
			{profile === null || loading ? (
				<Spinner />
			) : (
				<>
					<Link to="/profiles" className="btn btn-light">
						Back to Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to="/edit-profile" className='"btn '>
								{' '}
								Edit Profile
							</Link>
						)}
					<div
						style={{
							backgroundColor: 'rgba(256,256,256, 0.7)',
							border: '3px solid #b883f5',
							marginTop: '4%',
							boxShadow: ' 0px  0px 3px 5px  rgba(50, 34, 70, 0.21)',
						}}
					>
						<div>
							<ProfileTop profile={profile} />
							<ProfileAbout profile={profile} />{' '}
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{/*Experience*/}
							<div style={{ width: '50%' }} className=" bg-white-right p-2">
								<h2 class="text-primary">Experience</h2>

								{/* <h3 class="text-dark">{}</h3> */}

								{profile.experience.length > 0 ? (
									<>
										{profile.experience.map((experience) => (
											<div
												style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
											>
												<ProfileExperience
													key={experience._id}
													experience={experience}
												/>
											</div>
										))}
									</>
								) : (
									<h4>No Experience Available</h4>
								)}
							</div>

							{/*Education*/}
							<div style={{ width: '50%' }} className=" bg-white-left p-2">
								<h2 class="text-primary">Education</h2>

								{profile.education.length > 0 ? (
									<>
										{profile.education.map((education) => (
											<div
												style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
											>
												<ProfileEducation
													key={education._id}
													education={education}
												/>
											</div>
										))}
									</>
								) : (
									<h4>No Education Available</h4>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
