import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { useParams } from 'react-router-dom';
import PostItem from './PostItem';

import Spinner from '../layout/Spinner';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	const id = useParams();
	useEffect(() => {
		getPosts();
	}, [getPosts, posts, id]);
	return (
		<div>
			{loading ? (
				<Spinner />
			) : (
				<div>
					<div className="container">
						<h1>Posts</h1>
						<h3>Welcome to the community</h3>
					</div>

					<PostForm />

					<div className="posts">
						{posts.map((post) => (
							<PostItem key={post._id} post={post} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
