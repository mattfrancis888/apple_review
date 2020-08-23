import React from "react";
import { mount, shallow } from "enzyme";
import { Route, MemoryRouter } from "react-router";
import App from "components/App";
import Header from "components/Header";
import Body from "components/Body";
import Root from "Root";

it("has <Header>", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toEqual(1);
    //3 types of renders: Static, shallow, and Full DOM (mount)
    //Shallow renders the child <components> inside the component but it does not render what's inside the child <component>
    //Shallow render does not need to unmount();
});

//https://stackoverflow.com/questions/48739441/testing-react-router-v4-with-jest-enzyme
//Only works with mount
describe("<App> has valid paths", () => {
    jest.mock("react-router-dom", () => {
        // Require the original module to not be mocked...
        const originalModule = jest.requireActual("react-router-dom");

        return {
            __esModule: true,
            ...originalModule,
            // add your noops here
            useParams: jest.fn(),
            useHistory: jest.fn(),
        };
    });

    //https://reactrouter.com/web/guides/testing
    //Use MemoryRouter instead of Router for testing;
    it("Shows <Body> at path /", () => {
        let wrapper = mount(
            <Root>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <Route exact path="/" render={() => <Body />} />
                </MemoryRouter>
            </Root>
        );
        expect(wrapper.find(Body)).toHaveLength(1);

        //FIX ME: Supposed to test <App> but <MemoryRouter>'s initial entries will not work
        //because of <Router> in <App/>
        // let wrapper = mount(
        //     <Root>
        //         <MemoryRouter initialEntries={["/random"]} initialIndex={0}>
        //             <App />
        //         </MemoryRouter>
        //     </Root>
        // );
        expect(wrapper.find(Body)).toHaveLength(1);
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
