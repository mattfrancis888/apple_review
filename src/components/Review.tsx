import React from "react";
const Review: React.FC<{}> = () => {
    return (
        <div className="reviewWrap">
            <div className="reviewNameAndDateWrap">
                <p className="reviewUserName">Username</p>

                <p className="reviewDate">, 2017-8-13</p>
            </div>
            <p className="reviewTitle">Review Title</p>
            <p className="reviewDesc">Best app ever</p>
        </div>
    );
};
export default Review;
