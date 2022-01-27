import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import LogOut from "./layouts/logout";
import Users from "./layouts/users";
import NotFound from "./components/page/not-found.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    return (
        <div>
            <AppLoader>
                <NavBar></NavBar>

                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />

                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </AppLoader>

            <ToastContainer />
        </div>
    );
};

export default App;
