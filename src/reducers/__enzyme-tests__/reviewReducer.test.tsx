//We have no reducer test for RTL because :
//The most important thing is that we aren't testing the reducer directly
// - it's an implementation detail of the component!
//Instead we need to test the component interface.
//https://testing-library.com/docs/example-react-hooks-usereducer

import configureMockStore from "redux-mock-store";
import {
    ActionTypes,
    FetchReviewsAction,
    FetchReviewsResponse,
    Review,
} from "actions";
import reviewReducer from "reducers/reviewReducer";
import thunk from "redux-thunk";
//refer to for guidance: https://redux.js.org/recipes/writing-tests
//https://medium.com/netscape/testing-a-react-redux-app-using-jest-and-enzyme-b349324803a9
it("uses reviewReducer to handle action of type ActionTypes.FETCH_REVIEWS", () => {
    const initialState = {
        reviews: [
            {
                id: 1,
                username: "Big Fish",
                date: "2017-09-16",
                title: "Apple Store Review",
                description: "App Description 1",
                rating: "1",
            },
        ],
    };

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore(initialState);

    const mockData: Review[] = [
        {
            id: 1,
            username: "Big Fish",
            date: "2017-09-16",
            title: "Apple Store Review",
            description: "App Description 1",
            rating: "1",
        },
        {
            id: 2,
            username: "ILoveApple",
            date: "2017-10-16",
            title: "Review of App",
            description: "App Description 2",
            rating: "2",
        },
    ];

    const expectedState = [
        {
            id: 1,
            username: "Big Fish",
            date: "2017-09-16",
            title: "Apple Store Review",
            description: "App Description 1",
            rating: "1",
        },
        {
            id: 2,
            username: "ILoveApple",
            date: "2017-10-16",
            title: "Review of App",
            description: "App Description 2",
            rating: "2",
        },
        [
            {
                id: 1,
                username: "Big Fish",
                date: "2017-09-16",
                title: "Apple Store Review",
                description: "App Description 1",
                rating: "1",
            },
        ],
    ];

    const reviews: FetchReviewsResponse = { reviews: mockData };
    const action: FetchReviewsAction = {
        type: ActionTypes.FETCH_REVIEWS,
        payload: reviews,
    };
    //Checks if our store changes when we call the reducer (essentialy same logic that can be applied to unit testing POST, DELETE, etc)
    const newState = reviewReducer(store.getState(), action);
    expect(Object.values(newState)).toEqual(expectedState);
    //Behaviour is suppose to return the new state and overriding the previous elements, this test does not do this. It creates the new state but
    //it does NOT overide the previous elements
});
