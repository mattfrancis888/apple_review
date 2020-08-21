import { ActionTypes, showHeaderOverlay, fetchReviews } from "actions";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";

//testing action creator without middleware/redux-thunk
describe("showHeaderOverlay() action validation", () => {
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

//testing action creators with middleware/redux-thunk
//refer to for guidance:https://redux.js.org/recipes/writing-tests
describe("fetchReviews() action validation", () => {
    const middlewares = [thunk]; // add your middlewares like `redux-thunk`
    const mockStore = configureStore(middlewares);

    it("has the correct type and payload", () => {
        //How to set up nock: http://joeellis.la/testing-redux-actions/
        const mockData = {
            reviews: [
                {
                    id: 1,
                    username: "Big Fish",
                    date: "2017-09-16",
                    title: "Apple Store Review",
                    description: "App Description 1",
                    rating: 1,
                },
            ],
        };
        const expectedAction = [
            {
                type: ActionTypes.FETCH_REVIEWS,
                payload: mockData,
            },
        ];

        nock("https://apple-review-backend.vercel.app")
            .get("/db.json")
            .reply(200, mockData, { "Access-Control-Allow-Origin": "*" });
        //For POST and other requests, consider other CORS options covered here:
        //https://github.com/axios/axios/issues/2654
        //DO not removed CORS option or else nock will give you a Network Error in the test suite
        const store = mockStore();

        //https://stackoverflow.com/questions/60049490/argument-of-type-thunkaction-is-not-assignable-to-parameter-of-type-anyaction
        //Typescript Issue for fetchReviews()
        //(will not interfere with run time, but will just give a TS warning):
        // Normaly :Dispatch is assigned as the dispatch type in the action creator
        //However with store.dispatch() here. we must change dispatch type to :DispatchThunk
        //It is still not working, get back to it later.
        return store.dispatch(fetchReviews()).then(() => {
            //fetchReviews() will return mockData because of nock now; nock mocks fetchReviews by having the same url as fethReviews()
            // return the actions of store
            expect(store.getActions()).toEqual(expectedAction);
        });
    });
});

afterEach(function () {
    // if (!nock.isDone()) {
    //     console.log("Not all nock interceptors were used!");
    //     nock.cleanAll();
    // }
    //   nock.restore();
});

//Example with moxios library rather than nock
//https://github.com/nock/nock/issues/699
