import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading } }) => {
	const { id } = useParams();

	useEffect(() => {
		getPost(id);
	}, [getPost, id]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<>
			<div style={{ margin: '7% 7% 0 7%' }}>
				<Link to="/posts" className="btn">
					Back To Posts
				</Link>
			</div>

			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />

			<div className="comments" style={{ margin: '7% 7% 0 7%' }}>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
