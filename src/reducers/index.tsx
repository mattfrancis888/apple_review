import { combineReducers } from "redux";
import showOverlayReducer from "./showOverlayReducer";

export interface StoreState {
    headerOverlay: boolean;
}
export default combineReducers<StoreState>({
    headerOverlay: showOverlayReducer,
});
