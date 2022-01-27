import React, { useEffect } from "react";
import { orderBy } from "lodash";
import { nanoid } from "nanoid";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    createComment,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    const addComment = (comment) => {
        comment = {
            ...comment,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        dispatch(createComment(comment));
    };

    const deleteComment = (commentId) => {
        dispatch(removeComment(commentId));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    // const addComment = (data) => {
    //     api.comments.add(data).then((comment) => console.log(comment));
    //     setIsUpdate(true);
    // };

    // const commentOwner = (userId) => {
    //     const owner = users.find((user) => user._id === userId);
    //     console.log(owner);
    //     return owner ? owner.name : "";
    // };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm addComment={addComment} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                deleteComment={deleteComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
