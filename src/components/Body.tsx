import React from "react";
import appleApp from "../img/appleApp.png";

const Body: React.FC<{}> = (props) => {
    return (
        <React.Fragment>
            <div className="appStoreTitleContainer">
                <h1>App Store</h1>
            </div>
            <div className="contentContainer">
                <div className="banner">
                    <p>
                        This app is available only on the App Store for iPhone,
                        iPad and Apple Watch.
                    </p>
                </div>
                <div className="appContainer">
                    <div className="appImageContainer">
                        <img src={appleApp} alt="app icon" />
                    </div>
                    <div className="appInfoContainer">
                        <h1 className="appTitle">Apple Store</h1>
                        <h2 className="appShortDesc">
                            Shopping designed around you
                        </h2>
                        <h2 className="appCompany">Apple</h2>
                        <h2 className="appRank">#53 in Shopping</h2>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Body;
