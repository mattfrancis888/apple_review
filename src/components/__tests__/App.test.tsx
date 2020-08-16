import React from "react";
import { shallow } from "enzyme";
import App from "components/App";
import Header from "components/Header";
it("shows header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toEqual(1);
    //3 types of renders: Static, shallow, and Full DOM (mount)
    //Shallow render does not need to unmount();
});
