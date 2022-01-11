import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ width, user }) => {
    return (
        <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width={width}
            height={width === "65" ? "65" : ""}
        />
    );
};

Avatar.propTypes = {
    width: PropTypes.string.isRequired,
    user: PropTypes.object
};

export default Avatar;
