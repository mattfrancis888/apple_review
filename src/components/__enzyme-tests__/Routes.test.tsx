import React from "react";
//import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import Body from "components/Body";
import Error from "components/Error";
import Root from "Root";
import Routes from "components/Routes";
describe("<Routes> has valid paths", () => {
    //https://reactrouter.com/web/guides/testing
    //Use MemoryRouter instead of Router for testing;

    //https://stackoverflow.com/questions/48739441/testing-react-router-v4-with-jest-enzyme
    //Routing only works with mount

    //Set up example with memoryrouter:
    //https://stackoverflow.com/questions/59892304/cant-get-memoryrouter-to-work-with-testing-library-react

    test("Shows <Body> at path / - MemoryRouter Way", () => {
        const wrapper = mount(
            <Root>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <Routes />
                </MemoryRouter>
            </Root>
        );
        expect(wrapper.find(Body)).toHaveLength(1);
    });

    test("Shows <Error> at path /error - MemoryRouter Way", () => {
        const wrapper = mount(
            <Root>
                <MemoryRouter initialEntries={["/error"]} initialIndex={0}>
                    <Routes />
                </MemoryRouter>
            </Root>
        );
        expect(wrapper.find(Error)).toHaveLength(1);
    });
});
