import reviews from "./axiosConfig";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Review {
    id: Number;
    username: String;
    date: String;
    title: String;
    description: String;
    rating: Number;
}

export interface FetchReviewsResponse {
    reviews: Review[];
}

export interface FetchReviewsAction {
    type: ActionTypes.FETCH_REVIEWS;
    payload: FetchReviewsResponse;
}

export const fetchReviews = () => async (dispatch: Dispatch) => {
    const response = await reviews.get<FetchReviewsResponse>("/db.json");
    //Note: As of 2020-0-18 request @2.88.2 is deprecated, so we cannot install JSON server until a fix is published.

    dispatch<FetchReviewsAction>({
        //Generic is an extra step to ensure that everything has the right values
        type: ActionTypes.FETCH_REVIEWS,
        payload: response.data,
    });
};
