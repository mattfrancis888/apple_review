import { ActionTypes, Actions, Review } from "../actions";
import _ from "lodash";
export default (state: Review[] = [], action: Actions) => {
    switch (
        action.type //switch(action.type) acts as a type guard so using | witl not cause union issues
    ) {
        case ActionTypes.FETCH_REVIEWS:
            // console.log({
            //     ...state,
            //     ..._.mapKeys(action.payload.reviews, "ee"),
            // });
            //looks like: {1: {…}, 2: {…}, 3: {…}, 4: {…}}
            return { ...state, ..._.mapKeys(action.payload.reviews, "id") };
        // return { ...state , action.payload.reviews};
        //note: we dont use return action.payload.reviews above because
        //when we update redux with post, we want to match eac
        case ActionTypes.POST_REVIEW:
            //console.log({ ...state, [action.payload.id]: action.payload });
            //looks like: {1: {…}, 2: {…}, 3: {…}, 4: {…}}
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};
