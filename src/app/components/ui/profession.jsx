import React from "react";
import PropTypes from "prop-types";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionById(id));

    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else return "Loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
