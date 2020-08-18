import React from "react";
import { mount, shallow } from "enzyme";
import { Route, MemoryRouter } from "react-router";
import App from "components/App";
import Header from "components/Header";
import Body from "components/Body";

it("shows header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toEqual(1);
    //3 types of renders: Static, shallow, and Full DOM (mount)
    //Shallow renders the child <components> inside the component but it does not render what's inside the child <component>
    //Shallow render does not need to unmount();
});

//https://stackoverflow.com/questions/48739441/testing-react-router-v4-with-jest-enzyme
//Only works with mount
describe("<App> path is valid", () => {
    it("valid path", () => {
        let wrapper = mount(
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                <Route path="/" render={() => <Body />} />
            </MemoryRouter>
        );
        expect(wrapper.find(Body)).toHaveLength(1);
    });

    it("invalid path", () => {
        let wrapper = mount(
            <MemoryRouter initialEntries={["/randomUrl"]} initialIndex={0}>
                <Route path="/" render={() => null} />
            </MemoryRouter>
        );
        expect(wrapper.find(Body)).toHaveLength(0);
    });
});
