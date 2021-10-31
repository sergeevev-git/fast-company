import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/grouplist.jsx";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import UserPage from "../userPage/userPage.jsx";
import { useParams } from "react-router";
import TextField from "../../common/form/textField";

const UsersListPage = () => {
    const [professions, setProfessions] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();

    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((item) => item._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter((user) =>
                  user.name
                      .toLowerCase()
                      .includes(searchQuery.toLocaleLowerCase())
              )
            : selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <>
                {userId && <UserPage id={userId} />}
                {!userId && (
                    <div className="d-flex">
                        {professions && (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onItemSelect={handleProfessionSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column">
                            <SearchStatus length={count} />

                            <TextField
                                name="searchQuery"
                                type="search"
                                value={searchQuery}
                                placeholder="Search..."
                                onChange={handleSearchQuery}
                            />

                            {count > 0 && (
                                <UsersTable
                                    users={usersCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    onDelete={handleDelete}
                                    onToggleBookmark={handleToggleBookmark}
                                />
                            )}
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
    return <h1>Loading...</h1>;
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
