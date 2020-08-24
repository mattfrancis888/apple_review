//We have no reducer test for RTL because:
//The most important thing is that we aren't testing the reducer directly
// - it's an implementation detail of the component!
//Instead we need to test the component interface.
//https://testing-library.com/docs/example-react-hooks-usereducer

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
