import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Root from "Root";
import App from "components/App";

let wrapper: ReactWrapper;
beforeEach(() => {
    wrapper = mount(
        <Root>
            <App />
        </Root>
    );
});
describe("header and overlay functionality", () => {
    it("can expand header and show overlay", () => {
        //Render entire App

        //Expect Overlay to be "hidden" at first
        expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);

        //Find icon that switches between hamburger and close icon in <Header>
        wrapper.find(".hamburgerAndCloseIcon").simulate("click");
        //Note: Unit testing is already for switching icons between the
        //hamburger and close icon when it's clicked

        //Expect Overlay to "expand" by switching classes assigned to <Overlay>'s elements
        expect(wrapper.find(".overlayContainer").length).toEqual(1);
    });

    it("overlay automatically closed when window is >= 768px", () => {
        //starts with hamburger icon
        wrapper.find(".hamburgerAndCloseIcon").simulate("click");

        // Change the viewport to 768px.
        //Note: Make sure it's the same as the viewports defined in scss/utilities/_variables
        global.innerWidth = 768;

        // Trigger the window resize event.
        global.dispatchEvent(new Event("resize"));

        //Hides overlay
        expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);
    });
});
