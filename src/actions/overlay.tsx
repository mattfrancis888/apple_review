import { ActionTypes } from "./types";

export interface HeaderOverlayAction {
    type: ActionTypes.SHOW_HEADER_OVERLAY;
    payload: boolean;
}

export const showHeaderOverlay = (
    shouldShowHeaderOverlay: boolean
): HeaderOverlayAction => {
    return {
        type: ActionTypes.SHOW_HEADER_OVERLAY,
        payload: shouldShowHeaderOverlay,
    };
};
