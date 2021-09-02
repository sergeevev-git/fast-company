import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status }) => {
    const checkStatus = () => {
        return status ? "-check-fill" : "";
    };
    return <i className={"bi bi-bookmark" + checkStatus()}></i>;
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmark;
