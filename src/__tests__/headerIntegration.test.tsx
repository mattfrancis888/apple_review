import React from "react";
import { mount } from "enzyme";
import Header from "components/Header";
import Root from "Root";
import App from "components/App";

it("can expand header and show overlay", () => {
    //Render entire App
    const wrapper = mount(
        <Root>
            <App />
        </Root>
    );
    //Expect Overlay to be "hidden" at first
    expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);

    //Find icon that switches between hamburger and close icon in <Header>
    wrapper.find(".hamburgerAndCloseIcon").simulate("click");
    //Note: Unit testing is already for switching icons between the
    //hamburger and close icon when it's clicked

    //Expect Overlay to "expand" by switching classes assigned to <Overlay>'s elements
    expect(wrapper.find(".overlayContainer").length).toEqual(1);
});
