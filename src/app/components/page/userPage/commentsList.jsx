import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import Comment from "./comment";
import AddComment from "./addComment";

const CommentsList = ({ userId }) => {
    const [commentsForUser, setCommentsForUser] = useState([]);
    const [isUpdate, setIsUpdate] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        if (isUpdate) {
            api.comments.fetchCommentsForUser(userId).then((data) =>
                setCommentsForUser(
                    data.sort((a, b) => {
                        return b.created_at - a.created_at;
                    })
                )
            );

            setIsUpdate(false);
        }
    }, [isUpdate]);

    const deleteComment = (commentId) => {
        api.comments.remove(commentId).then((id) => console.log(id));
        setIsUpdate(true);
    };

    // const addComment = (data) => {
    //     api.comments.add(data).then((comment) => console.log(comment));
    //     setIsUpdate(true);
    // };

    const commentOwner = (userId) => {
        const owner = users.find((user) => user._id === userId);
        console.log(owner);
        return owner ? owner.name : "";
    };

    if (commentsForUser.length !== 0) {
        return (
            <>
                <div className="card mb-2">
                    <div className="card-body ">
                        <AddComment
                            users={users}
                            // addComment={addComment}
                            pageOwner={userId}
                            setIsUpdate={setIsUpdate}
                        />
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {commentsForUser.map((comment) => (
                            <Comment
                                key={comment._id}
                                id={comment._id}
                                // name={comment.userId}
                                name={commentOwner(comment.userId)}
                                time={comment.created_at}
                                comment={comment.content}
                                deleteComment={deleteComment}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="card mb-2">
            <div className="card-body ">
                <AddComment
                    users={users}
                    // addComment={addComment}
                    pageOwner={userId}
                    setIsUpdate={setIsUpdate}
                />
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    userId: PropTypes.string.isRequired
};

export default CommentsList;
