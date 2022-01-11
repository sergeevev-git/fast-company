import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item m-3">
                        <Link to="/">Main page</Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item m-3">
                            <Link to="/users">Users</Link>
                        </li>
                    )}
                    <li className="nav-item m-3"></li>
                </ul>
                <div className="d-flex">
                    {currentUser ? (
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
