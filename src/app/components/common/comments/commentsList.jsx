import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, deleteComment }) => {
    return comments.map((comment) => (
        <Comment key={comment._id} {...comment} deleteComment={deleteComment} />
    ));
};

CommentsList.propTypes = {
    comment: PropTypes.array,
    deleteComment: PropTypes.func
};

export default CommentsList;
