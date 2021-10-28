import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    const checkStatus = () => {
        return status ? "-check-fill" : "";
    };
    return (
        <button {...rest}>
            <i className={"bi bi-bookmark" + checkStatus()}></i>
        </button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmark;
