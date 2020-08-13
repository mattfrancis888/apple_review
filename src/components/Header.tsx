import React from "react";
import logo from "../img/appleIcon.png";
import hamburger from "../img/hamburger.png";
import closeOverlay from "../img/appleClose.png";
import { connect } from "react-redux";
import { showHeaderOverlay } from "../actions";
import { StoreState } from "../reducers";
interface HeaderProps {
    //Props from redux
    headerOverlay: boolean;
    showHeaderOverlay(shouldShowHeaderOverlay: boolean): void;
}
const Header: React.FC<HeaderProps> = (props) => {
    return (
        <nav>
            <img
                className="hamburgerIcon"
                src={props.headerOverlay ? closeOverlay : hamburger}
                alt="hamburger-icon"
                onClick={() => {
                    props.showHeaderOverlay(!props.headerOverlay);
                }}
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

const mapStateToProps = (state: StoreState) => {
    return {
        headerOverlay: state.headerOverlay,
    };
};
export default connect(mapStateToProps, { showHeaderOverlay })(Header);
