import Root from "Root";
import React from "react";
import Body from "components/Body";
import "@testing-library/jest-dom/extend-expect";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FetchReviewsResponse } from "actions";
import nock from "nock";
import waitForExpect from "wait-for-expect";

afterEach(() => {
    cleanup();
});
let app: RenderResult;

beforeEach(async () => {
    await act(async () => {
        //https://github.com/enzymejs/enzyme/issues/2423
        //https://stackoverflow.com/questions/55047535/testing-react-components-that-fetches-data-using-hooks

        //axios call made in componentDidMout() was resolved after our test ends. This will cause a Network Error / Redux reducer returning null/undefined
        ///Error in the test terminal.
        // By covering it with act(async()...) we can "wait" fetchRequest() to finish so that we can mock it with nock.
        app = render(
            <Root>
                <Body />
            </Root>
        );
    });
});
describe("<Body> tests", () => {
    let mockData: FetchReviewsResponse;

    beforeEach(async () => {
        mockData = {
            reviews: [
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
            ],
        };
    });

    it("ComponentDidMount() fetches data and fills up DOM with <ReviewBox>", async () => {
        //IMPORTANT NOTE ON BUG: There seems to be an issue with nock being stuck on pending request when ReduxForm (<ReviewForm) is added to <Body>
        //removing it in <Body> will make this test work; use jest.fn() next time to mock http requests or a different library;
        const scope = nock("https://apple-review-backend.vercel.app")
            .get("/reviews")
            .once()
            .reply(200, mockData, { "Access-Control-Allow-Origin": "*" });

        await waitForExpect(() => {
            if (!scope.isDone()) {
                console.error("pending mocks: %j", scope.pendingMocks());
            }
            expect(scope.isDone()).toBe(true);

            expect(app.getAllByTestId("reviewWrap").length).toEqual(
                mockData.reviews.length
            );
        });
    }, 30000); //30000 is our custom setTimeOut; not using Jest default timeout
});

test("Redux form created for Reviews has the right values ", () => {
    //Refer to: https://codesandbox.io/s/nostalgic-greider-4gqcg?file=/src/UserForm.js:445-467
    //There is no point to test redux form since it's already been tested by the creators
    //https://stackoverflow.com/questions/54671473/testing-simple-redux-form-with-enzyme-where-is-value

    //But here's an example:
    const expectedMockFormValues = {
        username: "mockName",
        title: "mockTitle",
        review: "mockReview",
        rating: "1",
    };

    const usernameInput = app.getByPlaceholderText(/apple username/i);
    const reviewTitleInput = app.getByPlaceholderText(/title of review/i);
    const reviewTextArea = app.getByPlaceholderText(/this app is amazing.../i);
    const ratingInput = app.getByPlaceholderText("5");
    fireEvent.change(usernameInput, {
        target: { value: expectedMockFormValues.username },
    });
    fireEvent.change(reviewTitleInput, {
        target: { value: expectedMockFormValues.title },
    });
    fireEvent.change(reviewTextArea, {
        target: { value: expectedMockFormValues.review },
    });
    fireEvent.change(ratingInput, {
        target: { value: expectedMockFormValues.rating },
    });
    act(() => {
        //const formElement = app.getByText("Submit").closest("form");
        const formElement = app.getByTestId("reviewForm");
        expect(formElement).toHaveFormValues(expectedMockFormValues);
        // if (formElement) {
        //     fireEvent.submit(formElement);
        // }
    });

    // const mockFormData = {
    //     username: "mockName",
    //     title: "mockTitle",
    //     review: "mockReview",
    //     rating: "1",
    //     id: 9999,
    //     date: "09/16/2019",
    // };

    // const scope = nock("https://apple-review-backend.vercel.app")
    //     .post("/reviews")
    //     .reply(200, mockFormData, { "Access-Control-Allow-Origin": "*" });

    // await waitForExpect(() => {
    //     expect(scope.isDone()).toBe(true);
    // });
    //it is best if we do not do a unit test on our own database; an e2e test that mocks our database would be much more useful
    //https://stackoverflow.com/questions/12526160/mocking-database-in-node-js
});
