import React from "react";
import { Route, Switch } from "react-router-dom";
import Body from "./Body";
import Error from "./Error";
const Routes: React.FC<{}> = () => {
    return (
        <Switch>
            <Route path="/" exact component={Body} />
            <Route path="/error" exact component={Error} />
        </Switch>
    );
};

export default Routes;
