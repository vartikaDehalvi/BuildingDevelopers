import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [toDateDisabled, setToDateDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;

	const onchange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<>
			<section class="register-form-container">
				<div className="inner-section">
					<h1 class="large text-primary">Add Your Education</h1>
					<p class="lead">
						<i class="fas fa-code-branch"></i> Add any school/college or
						bootcamp you have attended
					</p>
					<small>* = required field</small>
					<form
						class="form"
						onSubmit={(e) => {
							e.preventDefault();
							addEducation(formData, navigate);
						}}
					>
						<div class="register-form-group">
							<input
								value={school}
								onChange={(e) => onchange(e)}
								type="text"
								placeholder="* School/College or Bootcamp"
								name="school"
								required
							/>
						</div>
						<div class="register-form-group">
							<input
								value={degree}
								onChange={(e) => onchange(e)}
								type="text"
								placeholder="* Degree of.."
								name="degree"
								required
							/>
						</div>
						<div class="register-form-group">
							<input
								value={fieldofstudy}
								onChange={(e) => onchange(e)}
								type="text"
								placeholder="Field of study"
								name="fieldofstudy"
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
								/>
								{''}
								Currently studying
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
								placeholder="Program Description"
								onChange={onchange}
							></textarea>
						</div>
						<input
							type="submit"
							class="btn my-1 register-form-group"
							style={{ marginRight: '2%' }}
						/>
						<Link
							class="btn btn-light my-1 register-form-group"
							to="/dashboard"
						>
							Go Back
						</Link>
					</form>
				</div>
			</section>
		</>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
