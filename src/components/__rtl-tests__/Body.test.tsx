import Root from "Root";
import React from "react";
import Body from "components/Body";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, RenderResult } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { FetchReviewsResponse } from "actions";
import nock from "nock";
import waitForExpect from "wait-for-expect";

afterEach(cleanup);

describe("<Body> integration", () => {
    let app: RenderResult;
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
                    rating: 1,
                },
                {
                    id: 2,
                    username: "ILoveApple",
                    date: "2017-10-16",
                    title: "Review of App",
                    description: "App Description 2",
                    rating: 2,
                },
            ],
        };

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

    it("ComponentDidMount() fetches data and fills up DOM with <ReviewBox>", async () => {
        const scope = nock("https://apple-review-backend.vercel.app")
            .get("/db.json")
            .reply(200, mockData, { "Access-Control-Allow-Origin": "*" });

        await waitForExpect(() => {
            // wrapper.update();
            expect(scope.isDone()).toBe(true);
            expect(app.getAllByTestId("reviewWrap").length).toEqual(
                mockData.reviews.length
            );
        });
    }, 30000); //30000 is our custom setTimeOut; not using Jest default timeout
});
