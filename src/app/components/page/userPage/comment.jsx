import React from "react";
import PropTypes from "prop-types";
import Avatar from "./avatar";

const Comment = ({ id, name, time, comment, deleteComment }) => {
    const timeToDate = (time) => {
        let dateOfComment = Date.now() - time;
        // console.log(dateOfComment);
        switch (true) {
            case dateOfComment < 1000 * 60: {
                dateOfComment = "менее минуты назад";
                break;
            }
            case dateOfComment < 1000 * 60 * 5: {
                dateOfComment = "менее 5 минут назад";
                break;
            }
            case dateOfComment < 1000 * 60 * 10: {
                dateOfComment = "менее 10 минут назад";
                break;
            }
            case dateOfComment < 1000 * 60 * 30: {
                dateOfComment = "менее 30 минут назад";
                console.log("object");
                break;
            }
            case dateOfComment < 1000 * 60 * 60 * 24: {
                dateOfComment = `${Math.floor(
                    dateOfComment / (1000 * 60 * 60)
                )} часа ${
                    Math.floor(dateOfComment / (1000 * 60)) % 60
                } минут назад`;
                break;
            }
            case dateOfComment < 1000 * 60 * 60 * 24 * 30: {
                dateOfComment = `${Math.floor(
                    dateOfComment / (1000 * 60 * 60 * 24)
                )} месяцев ${Math.floor(
                    dateOfComment / (1000 * 60 * 60)
                )} дней назад`;
                break;
            }
            default: {
                dateOfComment = `${Math.floor(
                    dateOfComment / (1000 * 60 * 60 * 365)
                )} лет ${Math.floor(
                    dateOfComment / (1000 * 60 * 60 * 24 * 30)
                )} месяцев ${Math.floor(
                    dateOfComment / (1000 * 60 * 60 * 24)
                )} дней назад`;
                break;
            }
        }
        return dateOfComment;
    };

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar width="65" />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {name}
                                        <span className="small">
                                            {" "}
                                            - {timeToDate(time)}
                                        </span>
                                    </p>
                                    <button
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        onClick={() => deleteComment(id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{comment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired
};

export default Comment;
