import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";
import QualitiesList from "./qualities/qualitiesList";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark
    // onDelete
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookmark(user._id)}
                />
            )
        }
        // delete: {
        //     component: (user) => (
        //         <button
        //             onClick={() => onDelete(user._id)}
        //             className="btn btn-danger"
        //         >
        //             delete
        //         </button>
        //     )
        // }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        ></Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
    // onDelete: PropTypes.func.isRequired
};

export default UserTable;
