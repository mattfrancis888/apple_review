import React from "react";
import appleApp from "../img/appleApp.png";
import iphoneScreenshot1 from "../img/iphoneScreenshot1.png";
import iphoneScreenshot2 from "../img/iphoneScreenshot2.png";
import iphoneScreenshot3 from "../img/iphoneScreenshot3.png";
import iphoneScreenshot4 from "../img/iphoneScreenshot4.png";
import Review from "./Review";
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
                <div className="appleStoreInfoContainer">
                    <p>
                        The Apple Store app provides a more personal way to shop
                        for the latest Apple products and accessories. Get
                        recommendations based on the Apple products you already
                        own. Find out which accessories are compatible with your
                        devices. Easily upgrade to a new iPhone from your
                        current one. Keep track of your orders wherever you go.
                        And sign up for hands-on sessions in store. You can even
                        use Apple Pay to check out from your iPhone when you
                        visit a participating Apple Store.
                    </p>
                </div>
                <div className="appVersionInfoContainer">
                    <h1>What's New</h1>
                    <p>
                        - The new For You tab shows your order status, devices,
                        services, reservations and even product tips, all in one
                        place.
                    </p>
                    <p>
                        - Find the iPhone that’s best for you by instantly
                        comparing it to the one you have.
                    </p>
                </div>
                <div className="appRatingAndReviews">
                    <h1>Ratings and Reviews</h1>
                    <div className="averageRating">
                        <span>3.6</span> out of 5
                    </div>
                    <div className="reviewsContainer">
                        <Review />
                        <Review />
                        <Review />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Body;
