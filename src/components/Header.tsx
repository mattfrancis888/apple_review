import React from "react";
import logo from "../img/appleIcon.png";
import hamburger from "../img/hamburger.png";
const Header: React.FC<{}> = () => {
    return (
        <nav>
            <img
                className="hamburgerIcon"
                src={hamburger}
                alt="hamburger-icon"
            />
            <img className="logo" src={logo} alt="apple-logo" />

            <div className="headerTextsWrapper">
                <h1 className="headerText">Mac</h1>
                <h1 className="headerText">iPad</h1>
                <h1 className="headerText">iPhone</h1>
                <h1 className="headerText">Watch</h1>
                <h1 className="headerText">TV</h1>
                <h1 className="headerText">Music</h1>
            </div>
        </nav>
    );
};

export default Header;
