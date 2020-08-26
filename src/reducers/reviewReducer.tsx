import { ActionTypes, Actions, Review } from "../actions";
export default (state: Review[] = [], action: Actions) => {
    switch (
        action.type //switch(action.type) acts as a type guard so using | witl not cause union issues
    ) {
        case ActionTypes.FETCH_REVIEWS:
            return action.payload.reviews;
        case ActionTypes.POST_REVIEW:
            console.log({ ...state, reviews: action.payload.reviews });
            return { ...state, reviews: action.payload.reviews };
        default:
            return state;
    }
};
