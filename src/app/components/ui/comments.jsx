import React, { useState, useEffect } from "react";
import api from "../../api";
import { orderBy } from "lodash";
import { useParams } from "react-router";
import CommentsList, { AddCommentForm } from "../common/comments";

const Comments = () => {
    const { userId } = useParams();
    const [commentsForUser, setCommentsForUser] = useState([]);
    // const [isUpdate, setIsUpdate] = useState(true);
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     api.users.fetchAll().then((data) => setUsers(data));
    // }, []);

    useEffect(() => {
        // if (isUpdate) {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setCommentsForUser(data));

        //     setIsUpdate(false);
        // }
    }, []);

    const addComment = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setCommentsForUser([...commentsForUser, data]));
    };

    const deleteComment = (commentId) => {
        api.comments
            .remove(commentId)
            .then(
                setCommentsForUser(
                    commentsForUser.filter((x) => x._id !== commentId)
                )
            );
        // setIsUpdate(true);
    };

    const sortedComments = orderBy(commentsForUser, ["created_at"], ["desc"]);

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
