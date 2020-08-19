import { ActionTypes, Review, FetchReviewsAction } from "../actions";
export default (state: Review[] = [], action: FetchReviewsAction) => {
    switch (action.type) {
        case ActionTypes.FETCH_REVIEWS:
            console.log("FETCH REVIEWS", action.payload.reviews);
            return action.payload.reviews;
        default:
            console.log("DEFAULT");
            return state;
    }
};
