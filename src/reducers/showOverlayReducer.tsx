import { ActionTypes, HeaderOverlayAction } from "../actions";
export default (state: boolean = false, action: HeaderOverlayAction) => {
    switch (action.type) {
        case ActionTypes.SHOW_HEADER_OVERLAY:
            return action.payload;
        default:
            return state;
    }
};
