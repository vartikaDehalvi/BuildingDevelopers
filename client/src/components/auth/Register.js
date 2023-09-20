import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	//Destructure from formData
	const { name, email, password, password2 } = formData;

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value, //key: value
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password !== password2) {
			setAlert('Passwords Mismatch', 'danger');
		} else {
			register({ name, email, password });

			//Without Redux
			// const newUser = {
			// 	name,
			// 	email,
			// 	password,
			// };
			// try {
			// 	const config = {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 	};

			// 	const body = JSON.stringify(newUser);
			// 	const res = await axios.post('/api/users', body, config); // Proxy already added in package.json
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.log(err.response.data);
			// }
		}
	};

	//Redirect if registered
	if (isAuthenticated) {
		navigate('/dashboard');
	}

	const alerts = useSelector((state) => state.alert);

	return (
		<>
			<section className="register-form-container ">
				<div className="inner-section">
					<h2 className="large text-primary">Sign Up</h2>
					<p className="lead">
						<i className="fas fa-user"></i> Create Your Account
					</p>
					<form className="form" onSubmit={(e) => onSubmit(e)}>
						{alerts.map((alert) => (
							<div key={alert.id} className={`alert alert-${alert.alertType}`}>
								{alert.msg}
							</div>
						))}
						<div className="group-container">
							<div className="register-form-group">
								<input
									type="text"
									placeholder="Name"
									name="name"
									value={name}
									onChange={(e) => onChange(e)}
								/>
							</div>
							<div className="register-form-group">
								<input
									type="email"
									value={email}
									placeholder="Email Address"
									onChange={(e) => onChange(e)}
									name="email"
								/>
								<small className="form-text">
									This site uses Gravatar so if you want a profile image, use a
									Gravatar email
								</small>
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
							<div className="register-form-group">
								<input
									type="password"
									placeholder="Confirm Password"
									name="password2"
									minLength="6"
									value={password2}
									onChange={(e) => onChange(e)}
								/>
							</div>

							<input
								type="submit"
								className="btn "
								value="Register"
								onSubmit={(e) => onSubmit(e)}
							/>
						</div>
					</form>
					<p className="my-1">
						Already have an account? |
						<span style={{ color: 'white', fontWeight: '200' }}>
							<Link to="/login"> Sign In</Link>
						</span>
					</p>
				</div>
			</section>
		</>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
