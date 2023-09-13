import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Alert from './components/layout/alert.js';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';
import { AboutPage } from './components/aboutPage';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="alert-class">
					<Alert />
				</div>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/profiles" element={<Profiles />}></Route>
					<Route path="/profile/:id" element={<Profile />}></Route>
					<Route path="/aboutPage" element={<AboutPage />}></Route>
					<Route
						path="/dashboard"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/create-profile"
						element={
							<PrivateRoute>
								<CreateProfile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/edit-profile"
						element={
							<PrivateRoute>
								<EditProfile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/add-experience"
						element={
							<PrivateRoute>
								<AddExperience />
							</PrivateRoute>
						}
					/>
					<Route
						path="/add-education"
						element={
							<PrivateRoute>
								<AddEducation />
							</PrivateRoute>
						}
					/>
					<Route
						path="/posts"
						element={
							<PrivateRoute>
								<Posts />
							</PrivateRoute>
						}
					/>
					<Route
						path="/post/:id"
						element={
							<PrivateRoute>
								<Post />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</Provider>
	);
};
export default App;
