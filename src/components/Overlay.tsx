import React, { useEffect, useState } from "react";
import { MAC, IPAD, IPHONE, WATCH, TV, MUSIC } from "../constants";
import { connect } from "react-redux";
import { showHeaderOverlay } from "../actions";
import { StoreState } from "../reducers";
import { HeaderProps } from "./Header";

const Overlay: React.FC<HeaderProps> = (props) => {
    //Note: Make sure it's the same as the viewports defined in scss/utilities/_variables
    const medium_screen_size = 768;

    //Hook is used to hide overlay when browser is greater than 768 px;
    //This solves the edge case where user clicks the hamburger icon at smaller viewport
    //but expands the viewport; doing so will get rid of the close icon, but the overlay
    //would still appear
    const [isDesktop, setDesktop] = useState(
        window.innerWidth > medium_screen_size
    );

    const updateMedia = () => {
        setDesktop(window.innerWidth > medium_screen_size);
        if (isDesktop) {
            props.showHeaderOverlay(false);
            //hide overlay
        }
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);

        //unmount lifecycle
        return () => window.removeEventListener("resize", updateMedia);
    });

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
