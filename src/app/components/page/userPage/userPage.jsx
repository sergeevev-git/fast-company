import api from "../../../api";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
// import CommentsList from "../../ui/comments";

const UserPage = ({ userId }) => {
    // const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);

    // const handleClick = () => {
    //     history.push("/users");
    // };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>
                    <div className="col md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
