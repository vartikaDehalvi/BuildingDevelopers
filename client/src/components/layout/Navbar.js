import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { logout } from '../../actions/auth';
import auth from '../../reducers/auth';
import { AboutPage } from '../aboutPage';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link className="a" to="/profiles">
					Developers
				</Link>
			</li>
			<li>
				<Link className="a" to="/posts">
					Posts
				</Link>
			</li>
			<li>
				<Link className="a" to="/dashboard">
					<i class="fa-solid fa-user"></i>
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link onClick={logout} className="a" to="/">
					<i class="fa-solid fa-arrow-right-from-bracket"></i> {''}
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link className="a" to="/profiles">
					Developers
				</Link>
			</li>
			<li>
				<Link className="a" to="/register">
					Register
				</Link>
			</li>
			<li>
				<Link className="a" to="/login">
					Login
				</Link>
			</li>
			<li>
				<Link className="a" to="/aboutPage">
					About Us
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link className="a" exact to="/">
					<i className="fa-solid fa-laptop-code fa"></i>
					BuildDev
				</Link>
			</h1>
			{loading ? null : isAuthenticated ? authLinks : guestLinks}
		</nav>
	);
};

Navbar.propTypes = {
	logout: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
