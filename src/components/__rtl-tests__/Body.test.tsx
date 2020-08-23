import Root from "Root";
import React from "react";
import Body from "components/Body";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, RenderResult } from "@testing-library/react";

let app: RenderResult;

//NOTE: Use 'initial state' when testing for Component's relationship with data
//use nock for integration tests, action creators
beforeEach(() => {
    const initialState = {
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

    app = render(
        <Root initialState={initialState}>
            <Body />
        </Root>
    );
});

afterEach(cleanup);
it("renders reviews in <Body> after retrieving reviews from database", () => {
    const mockData = [
        {
            id: 1,
            username: "Big Fish",
            date: "2017-09-16",
            title: "Apple Store Review",
            description: "App Description 1",
            rating: 1,
        },
    ];

    expect(app.getAllByTestId("reviewWrap").length).toEqual(mockData.length);
});

//https://stackoverflow.com/questions/54942892/jest-enzyme-test-a-function-call-in-componentdidmount
// it('should check `componentDidMount()`', () => {
//     const instance = wrapper.instance(); // you assign your instance of the wrapper
//     jest.spyOn(instance, 'randomFunction'); // You spy on the randomFunction
//     instance.componentDidMount();
//     expect(instance.randomFunction).toHaveBeenCalledTimes(1); // You check if the condition you want to match is correct.
//   });
