import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item m-3">
                        <Link to="/">Main page</Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item m-3">
                            <Link to="/users">Users</Link>
                        </li>
                    )}
                    <li className="nav-item m-3"></li>
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
