import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

export const CreateProfile = ({ createProfile }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',

		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,

		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData;

	const onchange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onsubmit = (e) => {
		e.preventDefault();
		createProfile(formData, navigate);
	};

	return (
		<>
			<section className="register-form-container">
				<div className="inner-section">
					<h1 className="large text-primary">Create Your Profile</h1>
					<p className="lead">
						<i className="fas fa-user"></i> Let's get some information to make
						your profile stand out
					</p>
					<small>* = required field</small>
					<form className="form" onSubmit={(e) => onsubmit(e)}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div style={{ width: '47%' }}>
								<div className="register-form-group">
									<select
										name="status"
										value={status}
										onChange={(e) => onchange(e)}
									>
										<option value="0">* Select Professional Status</option>
										<option value="Developer">Developer</option>
										<option value="Junior Developer">Junior Developer</option>
										<option value="Senior Developer">Senior Developer</option>
										<option value="Manager">Manager</option>
										<option value="Student or Learning">
											Student or Learning
										</option>
										<option value="Instructor">Instructor or Teacher</option>
										<option value="Intern">Intern</option>
										<option value="Other">Other</option>
									</select>
									<small className="form-text">
										Give us an idea of where you are at in your career
									</small>
								</div>
								<div className="register-form-group">
									<input
										type="text"
										placeholder="Company"
										name="company"
										value={company}
										onChange={(e) => onchange(e)}
									/>
									<small className="form-text">
										Could be your own company or one you work for
									</small>
								</div>
								<div className="register-form-group">
									<input
										type="text"
										placeholder="Website"
										name="website"
										value={website}
										onChange={(e) => onchange(e)}
									/>
									<small className="form-text">
										Could be your own or a company website
									</small>
								</div>
							</div>
							<div style={{ width: '47%' }}>
								<div className="register-form-group">
									<input
										type="text"
										placeholder="Location"
										name="location"
										value={location}
										onChange={(e) => onchange(e)}
									/>
									<small className="form-text">
										City & state suggested (eg. Boston, MA)
									</small>
								</div>
								<div className="register-form-group">
									<input
										type="text"
										placeholder="* Skills"
										name="skills"
										value={skills}
										onChange={(e) => onchange(e)}
									/>
									<small className="form-text">
										Please use comma separated values (eg.
										HTML,CSS,JavaScript,PHP)
									</small>
								</div>
							</div>
						</div>

						<div className="register-form-group">
							<textarea
								placeholder="A short bio of yours"
								name="bio"
								value={bio}
								onChange={(e) => onchange(e)}
							></textarea>
							<small className="form-text">
								Tell us a little about yourself
							</small>
						</div>

						<div className="my-2">
							<button
								onClick={() => toggleSocialInputs(!displaySocialInputs)}
								type="button"
								className="btn btn-light"
							>
								Add Social Network Links
							</button>
							<span>Optional</span>
						</div>

						{displaySocialInputs && (
							<>
								<div className="register-form-group social-input">
									<i className="fab fa-twitter fa-2x"></i>
									<input
										type="text"
										value={twitter}
										onChange={(e) => onchange(e)}
										placeholder="Twitter URL"
										name="twitter"
									/>
								</div>

								<div className="register-form-group social-input">
									<i className="fab fa-facebook fa-2x"></i>
									<input
										type="text"
										value={facebook}
										onChange={(e) => onchange(e)}
										placeholder="Facebook URL"
										name="facebook"
									/>
								</div>

								<div className="register-form-group social-input">
									<i className="fab fa-youtube fa-2x"></i>
									<input
										type="text"
										value={youtube}
										onChange={(e) => onchange(e)}
										placeholder="YouTube URL"
										name="youtube"
									/>
								</div>

								<div className="register-form-group social-input">
									<i className="fab fa-linkedin fa-2x"></i>
									<input
										type="text"
										value={linkedin}
										onChange={(e) => onchange(e)}
										placeholder="Linkedin URL"
										name="linkedin"
									/>
								</div>

								<div className="register-form-group social-input">
									<i className="fab fa-instagram fa-2x"></i>
									<input
										type="text"
										value={instagram}
										onChange={(e) => onchange(e)}
										placeholder="Instagram URL"
										name="instagram"
									/>
								</div>
							</>
						)}
						<input type="submit" className="btn my-1" />
						<Link className="btn btn-light my-1" to="/dashboard">
							Go Back
						</Link>
					</form>
				</div>
			</section>
		</>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
