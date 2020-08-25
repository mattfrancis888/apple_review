import reviews from "../backend/axiosConfig";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
// import { ThunkDispatch } from "redux-thunk";

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
    //Note to me: Online implementation, not local implementation. check your previous Pixar project
    //for your local implementation
    const response = await reviews.get<FetchReviewsResponse>("/reviews");
    return dispatch<FetchReviewsAction>({
        //Generic is an extra step to ensure that everything has the right values
        type: ActionTypes.FETCH_REVIEWS,
        payload: response.data,
    });
};
