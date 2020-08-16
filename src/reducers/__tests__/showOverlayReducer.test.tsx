import { ActionTypes } from "actions";
import showOverlayReducer from "reducers/showOverlayReducer";
it("handles action of type ActionTypes.SHOW_HEADER_OVERLAY", () => {
    const action = {
        type: ActionTypes.SHOW_HEADER_OVERLAY,
        payload: true,
    };

    const newState = showOverlayReducer(false, action);
    expect(newState).toEqual(true);
});
