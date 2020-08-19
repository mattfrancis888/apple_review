import { ActionTypes, Review, FetchReviewsAction } from "../actions";
export default (state: Review[] = [], action: FetchReviewsAction) => {
    switch (action.type) {
        case ActionTypes.FETCH_REVIEWS:
            return action.payload.reviews;
        default:
            return state;
    }
};
