import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((qualitie) => {
                    return <Qualitie key={qualitie} id={qualitie} />;
                })}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
