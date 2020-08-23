import React from "react";
//import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { Route, MemoryRouter } from "react-router";
import Body from "components/Body";
import Root from "Root";

describe("<Routes> has valid paths", () => {
    //https://reactrouter.com/web/guides/testing
    //Use MemoryRouter instead of Router for testing;

    //https://stackoverflow.com/questions/48739441/testing-react-router-v4-with-jest-enzyme
    //Routing only works with mount

    it("Shows <Body> at path /", () => {
        let wrapper = mount(
            <Root>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <Route exact path="/" render={() => <Body />} />
                </MemoryRouter>
            </Root>
        );
        expect(wrapper.find(Body)).toHaveLength(1);

        //Alternative way to do it:
        //Supposed to test <App> but <MemoryRouter>'s initial entries will not work
        //https://stackoverflow.com/questions/43076369/i-am-not-able-to-set-a-specefic-path-in-test
        //https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303

        // const TestRoute = (props) => (
        //     <Root>
        //         <MemoryRouter initialEntries={props.initialEntries}>
        //             <Routes {...props} />
        //         </MemoryRouter>
        //     </Root>
        // );
        // const div = document.createElement("div");
        // ReactDOM.render(<TestRoute initialEntries={["/error"]} />, div);
        // const elem = div.getElementsByClassName("contentContainer")[0];
        // // Make sure to change className when you change initialEntries
        // expect(elem).not.toBe(undefined); // check an element exists with that class
        // // Futher validation if needed:
        // if (elem !== undefined) {
        //     //expect(elem.innerHTML.includes("")).toBeTruthy(); //check it has worked
        //     //   expect(elem.innerHTML).toEqual("signup"); // check it has worked
        // }
    });

    it("invalid path check", () => {
        let wrapper = mount(
            <MemoryRouter initialEntries={["/randomUrl"]} initialIndex={0}>
                <Route path="/" render={() => null} />
            </MemoryRouter>
        );
        expect(wrapper.find(Body)).toHaveLength(0);
    });
});
