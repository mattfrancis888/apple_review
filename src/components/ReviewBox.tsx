import React from "react";
import { Review } from "../actions";

const ReviewBox: React.FC<Review> = ({
    username,
    date,
    title,
    description,
    rating,
}) => {
    return (
        <div data-testid="reviewWrap" className="reviewWrap">
            <div className="reviewNameAndDateWrap">
                <p className="reviewUserName">{username}</p>

                <p className="reviewDate">, {date}</p>
            </div>
            <p className="reviewTitle">{title}</p>
            <p className="reviewDesc">{description}</p>
            <p>Rating: {rating}</p>
        </div>
    );
};
export default ReviewBox;
