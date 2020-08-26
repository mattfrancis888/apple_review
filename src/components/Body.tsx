import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
    Review,
    fetchReviews,
    FetchReviewsResponse,
    createReview,
} from "../actions";
import { StoreState } from "../reducers";
import appleApp from "../img/appleApp.png";
import iphoneScreenshot1 from "../img/iphoneScreenshot1.png";
import iphoneScreenshot2 from "../img/iphoneScreenshot2.png";
import iphoneScreenshot3 from "../img/iphoneScreenshot3.png";
import iphoneScreenshot4 from "../img/iphoneScreenshot4.png";
import wallet from "../img/wallet.png";
import family from "../img/family.png";
import texas from "../img/texas.png";
import itunes from "../img/itunesMovie.png";
import logicRemote from "../img/logicRemote.png";
import appleDev from "../img/appleDev.png";
import shortcuts from "../img/shortcuts.png";
import beats from "../img/beats.png";
import ReviewBox from "./ReviewBox";
import Loading from "./Loading";
import ReviewForm, { ReviewFormValues } from "./ReviewForm";

export interface ReviewFormProps {
    onSubmit(formValues: any): any;
}

export interface BodyProps {
    fetchReviews(): void;
    createReview(formValues: any): void;
    reviews: Review[];
}

const Body: React.FC<BodyProps> = (props) => {
    useEffect(() => {
        props.fetchReviews();
    }, []);
    const onSubmit = (formValues: any) => {
        console.log("onSubmit");
        //Callback for ReviewForm
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes [Which is done in Streamform]
        //after clicking the submit button
        props.createReview(formValues);
    };
    const renderReviews = () => {
        if (props.reviews.length === 0)
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        else {
            console.log(props.reviews);
            let totalRating = 5;
            for (let rating in props.reviews) {
                totalRating += parseInt(rating);
            }
            totalRating = totalRating / props.reviews.length;

            return (
                <React.Fragment>
                    <div className="averageRating">
                        <span>{totalRating.toFixed(1)}</span> out of 5
                    </div>
                    <div className="reviewBoxesWrap">
                        {props.reviews.map((review) => {
                            return (
                                <ReviewBox
                                    {...review}
                                    key={review.id.toString()}
                                />
                            );
                        })}
                    </div>
                </React.Fragment>
            );
        }
    };
    return (
        <div data-testid="bodyContent">
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

                    <div className="appPreviewContainer">
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

                    <div className="reviewsContainer">{renderReviews()}</div>

                    <h1>Submit Your Own Review</h1>
                    <ReviewForm onSubmit={onSubmit} />
                </div>

                <div className="appInfoContainer">
                    <h1>Information</h1>
                    <div className="appInfoRowsWrap">
                        <div className="infoRow">
                            <p>Seller</p>
                            <p>Apple Canada, Inc.</p>
                        </div>
                        <div className="infoRow">
                            <p>Size</p>
                            <p>94.4 MB</p>
                        </div>
                        <div className="infoRow">
                            <p>Compatibility</p>
                            <p>
                                Requires iOS 12.0 and watchOS 4.0 or later.
                                Compatible with iPhone, iPad and iPod touch.
                            </p>
                        </div>
                        <div className="infoRow">
                            <p>Languages</p>
                            <p>
                                English, Czech, Danish, Dutch, Finnish, French,
                                German, Hungarian, Italian, Japanese, Korean,
                                Norwegian Bokmål, Polish, Portuguese, Russian,
                                Simplified Chinese, Spanish, Swedish, Thai,
                                Traditional Chinese, Turkish
                            </p>
                        </div>
                        <div className="infoRow">
                            <p>Age Rating</p>
                            <p>4+</p>
                        </div>
                        <div className="infoRow">
                            <p>Copyright</p>
                            <p>© 2020 Apple Inc.</p>
                        </div>
                    </div>
                </div>
                <div className="appSupportsContainer">
                    <h1>Supports</h1>
                    <div className="walletAndFamilyWrap">
                        <div className="walletContainer">
                            <img src={wallet} alt="wallet icon" />
                            <div className="walletInfoWrap">
                                <p>Wallet</p>
                                <p>
                                    Get all of your passes, tickets, cards, and
                                    more in one place.
                                </p>
                            </div>
                        </div>
                        <div className="familyContainer">
                            <img src={family} alt="family icon" />
                            <div className="familyInfoWrap">
                                <p>Family</p>
                                <p>
                                    Up to six family members will be able to use
                                    this app with Family Sharing enabled.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="moreByDevContainer">
                    <h1>More By This Developer</h1>
                    <div className="otherAppsByDev">
                        <div className="otherAppContainer">
                            <img src={texas} alt="text-holdem icon" />
                            <h4>Texas Hold'em</h4>
                            <p>Games </p>
                        </div>
                        <div className="otherAppContainer">
                            <img src={itunes} alt="itunes movie icon" />
                            <h4>iTunes Movie Trailers</h4>
                            <p>Entertainment</p>
                        </div>
                        <div className="otherAppContainer">
                            <img src={logicRemote} alt="logic remote icon" />
                            <h4>Logic Remote</h4>
                            <p>Music</p>
                        </div>
                        <div className="otherAppContainer">
                            <img src={appleDev} alt="apple dev icon" />
                            <h4>Apple Developer</h4>
                            <p>Developer Tools </p>
                        </div>
                        <div className="otherAppContainer">
                            <img src={shortcuts} alt="shortcuts icon" />
                            <h4>Shortcuts</h4>
                            <p>Productivity </p>
                        </div>
                        <div className="otherAppContainer">
                            <img src={beats} alt="shortcuts icon" />
                            <h4>Beats Pill⁺</h4>
                            <p>Utilities </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state: StoreState): FetchReviewsResponse => {
    return {
        reviews: Object.values(state.reviews),
        //transforms {1: {…}, 2: {…}, 3: {…}, 4: {…}} into [{…}, {…}, {…}]
    };
};
export default connect(mapStateToProps, { fetchReviews, createReview })(Body);
