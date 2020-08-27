import React from "react";
import Header from "./Header";
import history from "../browserHistory";
import { Router } from "react-router-dom";
import Footer from "./Footer";
import Routes from "./Routes";
const App: React.FC<{}> = () => {
    return (
        <Router history={history}>
            <Header />
            <Routes />
            <Footer />
        </Router>
    );
};

export default App;
