import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ width }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width={width}
            height={width === "65" ? "65" : ""}
        />
    );
};

Avatar.propTypes = {
    width: PropTypes.string.isRequired
};

export default Avatar;
