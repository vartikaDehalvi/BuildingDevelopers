import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';

const dashboardAlert = {
	margin: '0 auto',
	width: '50%',
	backgroundColor: 'rgba(255, 255, 255, 0)',
};

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	const alerts = useSelector((state) => state.alert);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<>
			<div className="welcome">
				<h1 className="large text-primary">Dashboard</h1>

				<p className="lead" style={{ display: 'flex', alignItems: 'center' }}>
					<button onClick={() => deleteAccount()} className="delete">
						<i class="fa-solid fa-trash tooltip">
							<span
								class="tooltiptext"
								style={{
									fontSize: '.8rem',
									fontFamily: 'Montserrat, sans-serif',
								}}
							>
								Delete Account
							</span>
						</i>
					</button>
					<i style={{ padding: '0 .5rem' }} class="fa-solid fa-user"></i>
					Welcome{' '}
					<div style={{ textTransform: 'capitalize', paddingLeft: '12px' }}>
						{`  ${user && user.name}`}
					</div>
				</p>
			</div>

			<div>
				{profile !== null ? (
					<>
						<div style={{ margin: '2rem 10% 0 10%' }}>
							<DashBoardActions />
						</div>
						<div>
							<div style={dashboardAlert}>
								{alerts.map((alert) => (
									<div
										key={alert.id}
										className={`alert alert-${alert.alertType}`}
									>
										{alert.msg}
									</div>
								))}
							</div>
						</div>
						<div className="credentials">
							<div
								className="edu-cred"
								style={{
									'@media (max-width: 850px)': {
										width: '100%',
									},
								}}
							>
								{' '}
								<Education education={profile.education} />
							</div>
							<div
								className="exp-cred"
								style={{
									'@media (max-width: 850px)': {
										width: '100%',
									},
								}}
							>
								{' '}
								<Experience experience={profile.experience} />
							</div>{' '}
						</div>
					</>
				) : (
					<>
						<h4
							style={{
								display: 'flex',
								textAlign: 'center',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: ' column',
							}}
						>
							No profile found. Please add some info
							<br />
							<div>
								<Link to="/create-profile">
									<div
										className="btn  "
										style={{
											textAlign: 'center',
											width: '100%',
										}}
									>
										Create Profile
									</div>
								</Link>
							</div>
						</h4>
					</>
				)}
			</div>
		</>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
