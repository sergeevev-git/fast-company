import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item m-3">
                <Link to="/">Main page</Link>
            </li>

            <li className="nav-item m-3">
                <Link to="/login">Login</Link>
            </li>

            <li className="nav-item m-3">
                <Link to="/users">Users</Link>
            </li>
        </ul>
    );
};

export default NavBar;
