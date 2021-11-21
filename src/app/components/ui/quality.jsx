import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQualities";

const Quality = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();

    if (!isLoading) {
        return qualities.map((id) => {
            const quality = getQuality(id);
            return (
                <span
                    key={quality._id}
                    className={"badge m-1 bg-" + quality.color}
                >
                    {quality.name}
                </span>
            );
        });
    } else return "Loading...";
};

Quality.propTypes = {
    qualities: PropTypes.array
};

export default Quality;
