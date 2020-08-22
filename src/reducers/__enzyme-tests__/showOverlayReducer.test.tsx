import { ActionTypes, HeaderOverlayAction } from "actions";
import showOverlayReducer from "reducers/showOverlayReducer";

it("uses overlayReducer to handle action of type ActionTypes.SHOW_HEADER_OVERLAY", () => {
    const action: HeaderOverlayAction = {
        type: ActionTypes.SHOW_HEADER_OVERLAY,
        payload: true,
    };

    const newState = showOverlayReducer(false, action);
    expect(newState).toEqual(true);
});
