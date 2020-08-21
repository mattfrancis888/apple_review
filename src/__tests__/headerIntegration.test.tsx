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
        //Expect Overlay to be "hidden" at first
        expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);

        //Find icon that switches between hamburger and close icon in <Header>
        wrapper.find(".hamburgerAndCloseIcon").simulate("click");
        //Note: Unit testing is already for switching icons between the
        //hamburger and close icon when it's clicked

        //Expect Overlay to "expand" by switching classes assigned to <Overlay>'s elements
        expect(wrapper.find(".overlayContainer").length).toEqual(1);

        //IMPORTANT: When we click the hamburgerAndCloseIcon (located in <Header>)..
        //Jest/Enzyme changes the store for <Header> but NOT for <Overlay>!
        //This is proven in <Header>'s unit test. Where our img src for the apple and close icon alternates with button clicks. But here...
        //If we do  wrapper.find(".hamburgerAndCloseIcon").simulate("click") again, .overlayContainerHidden would not replace .overlayContainer
    });

    it("overlay automatically closed when window is >= 768px", () => {
        // Change the viewport to 768px.
        //Note: Make sure it's the same as the viewports defined in scss/utilities/_variables
        //https://stackoverflow.com/questions/60396600/set-size-of-window-in-jest-and-jest-dom-and-jsdom
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 768,
        });
        window.dispatchEvent(new Event("resize"));
        expect(window.innerWidth).toBe(768);

        //Hides overlay
        expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);
    });
});
