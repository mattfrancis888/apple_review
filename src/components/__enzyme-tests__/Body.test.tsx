import Root from "Root";
import React from "react";
import Body from "components/Body";
import { mount, ReactWrapper } from "enzyme";

let wrapper: ReactWrapper;

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
                rating: "1",
            },
        ],
    };

    wrapper = mount(
        <Root initialState={initialState}>
            <Body />
        </Root>
    );
});

it("renders reviews in <Body> after retrieving reviews from database", () => {
    const mockData = [
        {
            id: 1,
            username: "Big Fish",
            date: "2017-09-16",
            title: "Apple Store Review",
            description: "App Description 1",
            rating: "1",
        },
    ];

    expect(wrapper.find(".reviewWrap").length).toEqual(mockData.length);
});

//Done in bodyintegration to practice using mount with nock + react hooks
//https://stackoverflow.com/questions/54942892/jest-enzyme-test-a-function-call-in-componentdidmount
// it('should check `componentDidMount()`', () => {
//     const instance = wrapper.instance(); // you assign your instance of the wrapper
//     jest.spyOn(instance, 'randomFunction'); // You spy on the randomFunction
//     instance.componentDidMount();
//     expect(instance.randomFunction).toHaveBeenCalledTimes(1); // You check if the condition you want to match is correct.
//   });

afterEach(() => {
    //No need to unmount if shallow is used
    wrapper.unmount();
});

// afterEach(function () {
//     if (!nock.isDone()) {
//         console.log("Not all nock interceptors were used!");
//         nock.cleanAll();
//     }
// });
