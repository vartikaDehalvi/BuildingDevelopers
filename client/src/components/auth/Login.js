import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';
import Spinner from '../layout/Spinner';

const Login = ({ login, isAuthenticated }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	//Destructure from formData
	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value, //key: value
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	//Redirect if loggedin
	if (isAuthenticated) {
		navigate('/dashboard');
	}
	return (
		<section className="register-form-container">
			<div className="inner-section">
				<h2 className="large text-primary">Sign In</h2>
				<p className="lead">
					<i className="fas fa-user"></i> Sign In to your account
				</p>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="register-form-group">
						<input
							type="email"
							value={email}
							placeholder="Email Address"
							onChange={(e) => onChange(e)}
							name="email"
						/>
					</div>
					<div className="register-form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => onChange(e)}
							minLength="6"
							value={password}
						/>
					</div>

					<input
						type="submit"
						className="btn "
						value="Login"
						onSubmit={(e) => onSubmit(e)}
					/>
				</form>
			</div>
		</section>
	);
};
Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
