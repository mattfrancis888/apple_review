import React from "react";
import { Review } from "../actions";
interface refProp {
    ref?: React.MutableRefObject<any>;
    //used in Body; need to pass in ref
}
const ReviewBox: React.FC<Review & refProp> = ({
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
