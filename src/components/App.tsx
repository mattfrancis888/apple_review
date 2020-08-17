import React from "react";
import Header from "./Header";
import history from "../browserHistory";
import { Route, Router, Switch } from "react-router-dom";
import Body from "./Body";
const App: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={Body} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default App;
