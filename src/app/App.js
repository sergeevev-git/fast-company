import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./components/page/not-found.jsx";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Switch>
                <QualityProvider>
                    <ProfessionProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                    </ProfessionProvider>
                </QualityProvider>
                <Route path="/" exact component={Main} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
            <ToastContainer />
        </div>
    );
};

export default App;
