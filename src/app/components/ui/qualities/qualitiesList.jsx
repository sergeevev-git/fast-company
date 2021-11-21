import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
// import { useParams } from "react-router-dom";

const QualitiesList = ({ qualities }) => {
    // const params = useParams();
    // const { userId } = params;

    return (
        <>
            {/* {userId ? (
                <div className="card mb-3">
                    <div className="card-body d-flex flex-column justify-content-center text-center">
                        <h5 className="card-title">
                            <span>Qualities</span>
                        </h5>
                        <p className="card-text">
                            {qualities.map((qualitie) => (
                                <Qualitie key={qualitie._id} {...qualitie} />
                            ))}
                        </p>
                    </div>
                </div>
            ) : (
                <> */}
            {qualities.map((qualitie) => {
                return <Qualitie key={qualitie._id} {...qualitie} />;
            })}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
