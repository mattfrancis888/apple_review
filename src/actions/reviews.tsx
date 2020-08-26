import reviews from "../backend/axiosConfig";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
// import { ThunkDispatch } from "redux-thunk";

export interface Review {
    id: number;
    username: string;
    date: Date;
    title: string;
    description: string;
    rating: number;
}

export interface FetchReviewsResponse {
    reviews: Review[];
}

export interface FetchReviewsAction {
    type: ActionTypes.FETCH_REVIEWS;
    payload: FetchReviewsResponse;
}
export interface PostReviewsAction {
    type: ActionTypes.POST_REVIEW;
    payload: Review;
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

export const createReview = (formValues: any) => async (dispatch: Dispatch) => {
    const response = await reviews.post("/reviews", { ...formValues });
    console.log("CREATE REVIEW");
    console.log(response.data);
    dispatch<PostReviewsAction>({
        type: ActionTypes.POST_REVIEW,
        payload: response.data,
    });
    //history.push("/"); //Go to / after creating a stream
};
