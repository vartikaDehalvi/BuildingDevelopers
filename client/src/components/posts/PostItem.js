import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'moment';
import { addLike, removeLike, deletePost, addPost } from '../../actions/post';

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	addPost,
	post: { _id, name, avatar, text, likes, comments, date, user },
	showActions,
}) => {
	const isoDate = date;

	const jsDate = new Date(isoDate);

	const formattedDate = Moment(jsDate).format('DD/MM/YYYY');

	return (
		<div>
			<div class="posts" style={{ margin: ' 0 7%' }}>
				<div class="post bg-white p-1 my-1">
					<div>
						<Link to={`/profile/${user}`}>
							<img class="round-img" src={avatar} alt={name} />
							<h4 style={{ textTransform: 'capitalize' }}>{name}</h4>
						</Link>
					</div>
					<div>
						<h4 class="my-1">{text}</h4>
						<h4 class="post-date">Posted on {formattedDate}</h4>
						{showActions && (
							<>
								<button
									onClick={(e) => addLike(_id)}
									type="button"
									class="btn btn-light"
								>
									<i className="fa-solid fa-thumbs-up"></i>{' '}
									{likes.length > 0 && <span>{likes.length}</span>}
								</button>
								<button
									onClick={(e) => removeLike(_id)}
									type="button"
									class="btn btn-light"
								>
									<i className="fa-solid fa-thumbs-down"></i>{' '}
								</button>

								<Link to={`/post/${_id}`} class="btn ">
									Discussion
									{comments.length > 0 && (
										<span className="comment-count">{comments.length}</span>
									)}
								</Link>
								{!auth.loading && user === auth.user._id && (
									<button
										onClick={(e) => deletePost(_id)}
										type="button"
										className="btn btn-danger"
									>
										<i className="fa-solid fa-xmark"></i>{' '}
									</button>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

PostItem.defaultProps = {
	showActions: true,
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
