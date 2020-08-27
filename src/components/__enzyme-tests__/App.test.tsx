import React from "react";
import { shallow } from "enzyme";
import App from "components/App";
import Header from "components/Header";
it("has <Header>", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toEqual(1);
    //3 types of renders: Static, shallow, and Full DOM (mount)
    //Shallow renders the child <components> inside the component but it does not render what's inside the child <component>
    //Shallow is used to  fully unit test because we isolate everything except the component in <Shallow>
    //Shallow render does not need to unmount();

    //When to use the 3 types of renders:
    //https://stackoverflow.com/questions/44082820/enzyme-when-to-use-shallow-render-or-mount
});
