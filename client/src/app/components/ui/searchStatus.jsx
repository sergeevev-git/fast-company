import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        return number > 4 || number < 2
            ? "человек тусанет"
            : "человека тусанут";
    };

    const getBadgeClasses = () => {
        let classes = "badge bg-";
        classes += length === 0 ? "danger" : "primary";
        return classes;
    };

    return (
        <h2>
            <span className={getBadgeClasses()}>
                {length} {renderPhrase(length)} с тобой сегодня
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
