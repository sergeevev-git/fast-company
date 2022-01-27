import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
import Avatar from "../ui/avatar";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };

    if (!currentUser) return "Loading...";

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <Avatar width="40" user={currentUser} />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
