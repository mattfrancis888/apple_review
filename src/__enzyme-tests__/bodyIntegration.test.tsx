import React from "react";
import nock from "nock";
import { mount, ReactWrapper } from "enzyme";
import Root from "Root";
import Body from "components/Body";
import waitForExpect from "wait-for-expect";
import ReviewBox from "components/ReviewBox";
import { FetchReviewsResponse } from "actions";
import { act } from "react-dom/test-utils";

//REFER TO THIS: https://blog.sapegin.me/all/react-testing-2-jest-and-enzyme/
//Also tells us how to trigger nock after an onclick or any events being simulated
describe("<Body> integration", () => {
    let wrapper: ReactWrapper;
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

        await act(async () => {
            //https://github.com/enzymejs/enzyme/issues/2423
            //https://stackoverflow.com/questions/55047535/testing-react-components-that-fetches-data-using-hooks

            //axios call made in componentDidMout() was resolved after our test ends. This will cause a Network Error / Redux reducer returning null/undefined
            ///Error in the test terminal.
            // By covering it with act(async()...) we can "wait" fetchRequest() to finish so that we can mock it with nock.
            wrapper = mount(
                <Root>
                    <Body />
                </Root>
            );
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
            wrapper.update();
            expect(scope.isDone()).toBe(true);
            expect(wrapper.find(ReviewBox).length).toEqual(
                mockData.reviews.length
            );
        });
    }, 30000); //30000 is our custom setTimeOut; not using Jest default timeout
});

// afterEach(function () {
//     if (!nock.isDone()) {
//         console.log("Not all nock interceptors were used!");
//         nock.cleanAll();
//     }
//     nock.restore();
// });
