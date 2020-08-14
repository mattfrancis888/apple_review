import React from "react";
import { MAC, IPAD, IPHONE, WATCH, TV, MUSIC } from "../constants";
import { connect } from "react-redux";
import { showHeaderOverlay } from "../actions";
import { StoreState } from "../reducers";
import { HeaderProps } from "./Header";

const Overlay: React.FC<HeaderProps> = (props) => {
    return (
        <div
            className={
                props.headerOverlay
                    ? "overlayContainer"
                    : "overlayContainerHidden"
            }
        >
            <div className="overlayTextsContainer">
                <h1
                    onClick={() => {
                        props.showHeaderOverlay(false);
                    }}
                >
                    {MAC}
                </h1>
                <h1
                    onClick={() => {
                        props.showHeaderOverlay(false);
                    }}
                >
                    {IPAD}
                </h1>
                <h1
                    onClick={() => {
                        props.showHeaderOverlay(false);
                    }}
                >
                    {IPHONE}
                </h1>
                <h1
                    onClick={() => {
                        props.showHeaderOverlay(false);
                    }}
                >
                    {WATCH}
                </h1>
                <h1
                    onClick={() => {
                        props.showHeaderOverlay(false);
                    }}
                >
                    {TV}
                </h1>
                <h1
                    onClick={() => {
                        props.showHeaderOverlay(false);
                    }}
                >
                    {MUSIC}
                </h1>
            </div>
        </div>
    );
};
const mapStateToProps = (state: StoreState) => {
    return {
        headerOverlay: state.headerOverlay,
    };
};
export default connect(mapStateToProps, { showHeaderOverlay })(Overlay);
