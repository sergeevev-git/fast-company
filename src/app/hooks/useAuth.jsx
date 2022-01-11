import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import userService from "../services/user.service";
import {
    setTokens,
    removeAuthData,
    getAccessToken
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        if (getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateUserData(data) {
        try {
            data = { ...data, qualities: data.qualities.map((q) => q.value) };
            const { content } = await userService.update(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureKey: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;

            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким e-mail уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;

            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw new Error("e-mail или password введены неверно");

                    case "EMAIL_NOT_FOUND":
                        throw new Error("e-mail или password введены неверно");

                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позднее."
                        );
                }
            }
        }
    }

    function logOut() {
        removeAuthData();
        setCurrentUser(null);
        history.push("/");
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            console.log(content);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, logOut, updateUserData, currentUser }}
        >
            {!isLoading ? children : "loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
