import React from "react";
import appleApp from "../img/appleApp.png";
import iphoneScreenshot1 from "../img/iphoneScreenshot1.png";
import iphoneScreenshot2 from "../img/iphoneScreenshot2.png";
import iphoneScreenshot3 from "../img/iphoneScreenshot3.png";
import iphoneScreenshot4 from "../img/iphoneScreenshot4.png";

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
                    <img className="appImage" src={appleApp} alt="app icon" />

                    <div className="appInfoContainer">
                        <h1 className="appTitle">Apple Store</h1>
                        <h2 className="appShortDesc">
                            Shopping designed around you
                        </h2>
                        <h2 className="appCompany">Apple</h2>
                        <h2 className="appRank">#53 in Shopping</h2>
                    </div>
                </div>
                <div className="screenshotsPreview">
                    <h1>Screenshots</h1>
                    <div className="screenshotsContainer">
                        <img src={iphoneScreenshot1} alt="screenshot 1" />
                        <img src={iphoneScreenshot2} alt="screenshot 2" />
                        <img src={iphoneScreenshot3} alt="screenshot 3" />
                        <img src={iphoneScreenshot4} alt="screenshot 4" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Body;
