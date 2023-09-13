import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Landing = ({ isAuthenticated }) => {
	const navigate = useNavigate();
	if (isAuthenticated) navigate('/dashboard');
	return (
		<section
			className="landing"
			style={{ backgroundColor: 'rgba(0,0,0, 0.9)' }}
		>
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Building Developers </h1>
					<p className="lead">
						A social platform for developers.
						<br></br> Create profile. Share posts. Help each other.
					</p>
					<div
						className="buttons"
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Link
							to="/register"
							className="btn btn-primary"
							style={{ color: 'white', width: '25%' }}
						>
							Sign Up
						</Link>
						<Link
							to="/login"
							className="btn "
							style={{
								backgroundColor: 'rgba(70, 070, 100, .9)',
								width: '25%',
							}}
						>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
