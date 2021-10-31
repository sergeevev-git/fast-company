import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./components/not-found.jsx";
import UserEditPage from "./components/page/userEditPage/userEditPage";

const App = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route exact path="/users/:userId?" component={Users} />
                <Route path="/users/:userId/edit" component={UserEditPage} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
};

export default App;
