import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
import App from "./App";
import Error from "./Error";
const Routes: React.FC<{}> = () => {
    return (
        <App>
            <Switch>
                <Route path="/" exact component={Body} />
                <Route path="/ee" exact component={Error} />
            </Switch>
        </App>
    );
};

export default Routes;
