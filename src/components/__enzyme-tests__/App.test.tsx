import React from "react";
import { shallow } from "enzyme";
import App from "components/App";
import Header from "components/Header";
it("has <Header>", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toEqual(1);
    //3 types of renders: Static, shallow, and Full DOM (mount)
    //Shallow renders the child <components> inside the component but it does not render what's inside the child <component>
    //Shallow render does not need to unmount();
});

//https://stackoverflow.com/questions/48739441/testing-react-router-v4-with-jest-enzyme
//Only works with mount
