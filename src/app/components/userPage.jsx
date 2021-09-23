import api from "../api";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((user) => setUser(user));
    }, []);

    return (
        <>
            {user && (
                <>
                    <h2>{user.name}</h2>
                    <h3>Профессия: {user.profession.name}</h3>
                    <QualitiesList qualities={user.qualities} />
                    <h4>completedMeetings: {user.completedMeetings}</h4>
                    <h3>Rate: {user.rate}</h3>
                    <button>
                        <Link to="/users">Все пользователи</Link>
                    </button>
                </>
            )}
            {!user && <h1>Loading...</h1>}
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
