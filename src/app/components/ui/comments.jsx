import React from "react";
import { orderBy } from "lodash";

import CommentsList, { AddCommentForm } from "../common/comments";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, removeComment, comments } = useComments();

    const addComment = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setcomments([...comments, data]));
    };

    const deleteComment = (commentId) => {
        removeComment(commentId);
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
                        <CommentsList
                            comments={sortedComments}
                            deleteComment={deleteComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
