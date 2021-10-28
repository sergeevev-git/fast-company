import api from "../../../api";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);

    const handleClick = () => {
        history.push("/users");
    };

    return (
        <>
            {user && (
                <>
                    <h2>{user.name}</h2>
                    <h3>Профессия: {user.profession.name}</h3>
                    <Qualities qualities={user.qualities} />
                    <h4>completedMeetings: {user.completedMeetings}</h4>
                    <h3>Rate: {user.rate}</h3>
                    {/* <button>
                        <Link to="/users">Все пользователи</Link>
                    </button> */}
                    <button onClick={handleClick}>Все пользователи</button>
                </>
            )}
            {!user && <h1>Loading...</h1>}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
