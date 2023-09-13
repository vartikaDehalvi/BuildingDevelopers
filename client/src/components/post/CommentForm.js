import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
	const [text, setText] = useState('');
	return (
		<div style={{ margin: '2% 7%' }} class="post-form">
			<h2>Leave a Comment</h2>

			<form
				class="form my-1"
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText('');
				}}
			>
				<textarea
					name="text"
					cols="30"
					rows="5"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Great Post"
					required
				></textarea>
				<input type="submit" class="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
