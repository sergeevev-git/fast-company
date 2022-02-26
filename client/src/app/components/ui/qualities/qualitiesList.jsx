import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./quality";

import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import { useSelector, useDispatch } from "react-redux";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return "Loading...";
    return (
        <>
            {qualitiesList.map((qualitie) => {
                return <Qualitie key={qualitie._id} {...qualitie} />;
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
