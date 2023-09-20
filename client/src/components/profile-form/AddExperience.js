import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, setToDateDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onchange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const alerts = useSelector((state) => state.alert);

	return (
		<>
			<section class="register-form-container">
				<div className="inner-section">
					<h1 class="large text-primary">Add An Experience</h1>
					<p class="lead">
						<i class="fas fa-code-branch"></i> Add any developer/programming
						positions that you have had in the past
					</p>
					<small>* = required field</small>
					<form
						class="form"
						onSubmit={(e) => {
							e.preventDefault();
							addExperience(formData, navigate);
						}}
					>
						{alerts.map((alert) => (
							<div key={alert.id} className={`alert alert-${alert.alertType}`}>
								{alert.msg}
							</div>
						))}
						<div class="register-form-group">
							<input
								value={title}
								onChange={(e) => onchange(e)}
								type="text"
								placeholder="* Job Title"
								name="title"
								required
							/>
						</div>
						<div class="register-form-group">
							<input
								value={company}
								onChange={(e) => onchange(e)}
								type="text"
								placeholder="* Company"
								name="company"
								required
							/>
						</div>
						<div class="register-form-group">
							<input
								value={location}
								onChange={(e) => onchange(e)}
								type="text"
								placeholder="Location"
								name="location"
							/>
						</div>
						<div class="register-form-group">
							<h2>From Date</h2>
							<input
								value={from}
								onChange={(e) => onchange(e)}
								type="date"
								name="from"
							/>
						</div>
						<div class="register-form-group">
							<p style={{ fontSize: '1rem', letterSpacing: '1px' }}>
								<input
									value={current}
									checked={current}
									onChange={(e) => {
										setFormData({ ...formData, current: !current });
										setToDateDisabled(!toDateDisabled);
									}}
									type="checkbox"
									name="current"
									style={{ margin: '0 1% 0 0' }}
								/>{' '}
								Current Job
							</p>
						</div>
						<div class="register-form-group">
							{toDateDisabled ? (
								<div style={{ opacity: 0.4 }}>
									<h2>To Date</h2>
									<input
										value={to}
										onChange={(e) => onchange(e)}
										type="date"
										name="to"
										disabled
									/>
								</div>
							) : (
								<div>
									<h2>To Date</h2>
									<input
										value={to}
										onChange={(e) => onchange(e)}
										type="date"
										name="to"
									/>
								</div>
							)}
						</div>
						<div class="register-form-group">
							<textarea
								value={description}
								name="description"
								cols="30"
								rows="5"
								placeholder="Job Description"
								onChange={onchange}
							></textarea>
						</div>
						<input type="submit" class="btn my-1" />
						<Link class="btn btn-light my-1" to="/dashboard">
							Go Back
						</Link>
					</form>
				</div>
			</section>
		</>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
