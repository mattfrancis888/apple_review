import { combineReducers } from "redux";
import showOverlayReducer from "./showOverlayReducer";
import reviewReducer from "./reviewReducer";
import { Review } from "../actions";
export interface StoreState {
    headerOverlay: boolean;
    reviews: Review[];
}
export default combineReducers<StoreState>({
    headerOverlay: showOverlayReducer,
    reviews: reviewReducer,
});
