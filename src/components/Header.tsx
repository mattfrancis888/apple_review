import React from "react";
import logo from "../img/appleIcon.png";
import hamburger from "../img/hamburger.png";
import closeOverlay from "../img/appleClose.png";
import { connect } from "react-redux";
import { showHeaderOverlay } from "../actions";
import { StoreState } from "../reducers";
import Overlay from "./Overlay";
import { MAC, IPAD, IPHONE, WATCH, TV, MUSIC } from "../constants";
import { useHistory } from "react-router-dom";
export interface HeaderProps {
    //Props from redux
    headerOverlay: boolean;
    showHeaderOverlay(shouldShowHeaderOverlay: boolean): void;
}
const Header: React.FC<HeaderProps> = (props) => {
    const history = useHistory();
    return (
        <React.Fragment>
            <nav
                data-testid="defaultHeader"
                className={
                    props.headerOverlay ? "headerExpand" : "defaultHeader"
                }
            >
                <div className="headerContentWrap">
                    <img
                        data-testid="hamburgerAndCloseIcon"
                        className="hamburgerAndCloseIcon"
                        src={props.headerOverlay ? closeOverlay : hamburger}
                        alt="hamburger or close icon"
                        onClick={() => {
                            props.showHeaderOverlay(!props.headerOverlay);
                        }}
                    />
                    <img
                        data-testid="appleLogo"
                        className="logo"
                        src={logo}
                        alt="apple-logo"
                        onClick={() => {
                            history.push("/");
                        }}
                    />

                    <div className="headerTextsWrapper">
                        <h1 className="headerText">{MAC}</h1>
                        <h1 className="headerText">{IPAD}</h1>
                        <h1 className="headerText">{IPHONE}</h1>
                        <h1 className="headerText">{WATCH}</h1>
                        <h1 className="headerText">{TV}</h1>
                        <h1 className="headerText">{MUSIC}</h1>
                    </div>
                </div>
                <Overlay />
            </nav>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        headerOverlay: state.headerOverlay,
    };
};
export default connect(mapStateToProps, { showHeaderOverlay })(Header);
