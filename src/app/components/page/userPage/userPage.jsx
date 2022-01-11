import React from "react";
import PropTypes from "prop-types";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";
// import CommentsList from "../../ui/comments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);

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
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
