import React from "react";
import Header from "./Header";
import history from "../browserHistory";
import { Router } from "react-router-dom";
import Footer from "./Footer";
const App: React.FC<{}> = ({ children }) => {
    return (
        <Router history={history}>
            <Header />
            {children}
            <Footer />
        </Router>
    );
};

export default App;
