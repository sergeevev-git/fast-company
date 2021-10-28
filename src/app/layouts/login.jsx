import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import Registerform from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = (params) => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <div className="container mt-5">
            <div className="row ">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <Registerform />
                            <p>
                                already have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign in
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                dont have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
