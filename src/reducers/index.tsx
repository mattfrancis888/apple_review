import { combineReducers } from "redux";
import showOverlayReducer from "./showOverlayReducer";
import reviewReducer from "./reviewReducer";
import { Review } from "../actions";
import { reducer as formReducer, FormStateMap } from "redux-form";

export interface StoreState {
    headerOverlay: boolean;
    reviews: Review[];
    form: FormStateMap;
}
export default combineReducers<StoreState>({
    headerOverlay: showOverlayReducer,
    reviews: reviewReducer,
    form: formReducer,
});
