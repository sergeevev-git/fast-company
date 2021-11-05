import api from "../../../api";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import MeetingsCard from "./meetingsCard";
import UserInfoCard from "./userInfoCard";
import CommentsList from "./commentsList";

const UserPage = ({ userId }) => {
    // const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((user) => setUser(user));
    }, []);

    // const handleClick = () => {
    //     history.push("/users");
    // };

    return (
        <>
            {user ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb3">
                            <UserInfoCard
                                id={user._id}
                                name={user.name}
                                profession={user.profession.name}
                                rate={user.rate}
                            />

                            <Qualities qualities={user.qualities} />
                            <MeetingsCard
                                completedMeetings={user.completedMeetings}
                            />
                        </div>
                        <div className="col md-8">
                            <CommentsList userId={userId} />
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
