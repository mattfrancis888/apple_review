import { ActionTypes, showHeaderOverlay } from "actions";

describe("showHeaderOverlay action validation", () => {
    it("has the correct type", () => {
        const sampleShowHeaderOverlayData = true;
        const action = showHeaderOverlay(sampleShowHeaderOverlayData);
        expect(action.type).toEqual(ActionTypes.SHOW_HEADER_OVERLAY);
    });

    it("has the correct payload", () => {
        const sampleShowHeaderOverlayData = true;
        const action = showHeaderOverlay(sampleShowHeaderOverlayData);
        expect(action.payload).toEqual(sampleShowHeaderOverlayData);
    });
});
