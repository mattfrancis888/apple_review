// export const SHOW_HEADER_OVERLAY = "SHOW_HEADER_OVERLAY";
// export const FETCH_FILMS = "FETCH_FILMS";
import { FetchReviewsAction, PostReviewsAction } from "../actions";
export enum ActionTypes {
    SHOW_HEADER_OVERLAY,
    FETCH_REVIEWS,
    POST_REVIEW,
}
export type Actions = FetchReviewsAction | PostReviewsAction;
