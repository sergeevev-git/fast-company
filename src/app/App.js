import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./components/users";
import NotFound from "./components/not-found.jsx";

const App = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                {/* <Route path="/posts/:postId?" component={Posts} />} /> */}
                {/* <Route
                    path="/posts/:postId?"
                    render={(props) => <Post posts={posts} {...props} />}
                />
                <Route
                    path="/posts"
                    render={(props) => <PostList posts={posts} {...props} />}
                /> */}
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
};

export default App;
