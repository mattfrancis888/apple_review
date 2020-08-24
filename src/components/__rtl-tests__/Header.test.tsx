import React from "react";
import Header from "components/Header";
import hamburger from "img/hamburger.png";
import appleClose from "img/appleClose.png";
import Root from "Root";
import "@testing-library/jest-dom/extend-expect";
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
} from "@testing-library/react";

let app: RenderResult;
let hamburgerAndCloseIcon: string;
let hamburgerAndCloseIconNode: HTMLElement;
beforeEach(() => {
    app = render(
        <Root>
            <Header />
        </Root>
    );
    hamburgerAndCloseIcon = "hamburgerAndCloseIcon";
    hamburgerAndCloseIconNode = app.getByTestId(hamburgerAndCloseIcon);
});
afterEach(cleanup);

describe("icon that switches between hamburger and close icon functionality", () => {
    //icon that switches between hamburger and close icon when clicked
    it("has icon that switches between hamburger icon and close icon", () => {
        expect(hamburgerAndCloseIconNode).toBeInTheDocument();
    });

    it("able to switch between hamburger icon and close icon when clicked", () => {
        //starts with hamburger icon
        expect(hamburgerAndCloseIconNode).toHaveAttribute("src", hamburger);
        fireEvent.click(hamburgerAndCloseIconNode);

        //switches to close icon
        expect(hamburgerAndCloseIconNode).toHaveAttribute("src", appleClose);

        fireEvent.click(hamburgerAndCloseIconNode);

        //switches back to hamburger icon
        expect(hamburgerAndCloseIconNode).toHaveAttribute("src", hamburger);
    });

    //Can't be unit tested because display:none is triggered with a media query
    //;RTL/Jest dosen't seem to support it
    // it(" when screen icon that switches between hamburger and close dissapears at larger sizes", () => {
    // });
});

it("has <Overlay/> that will appear or disappear when user clicks hamburger icon", () => {
    expect(app.getByTestId("overlay")).toBeInTheDocument();
});

// describe("header and overlay functionality", () => {
//     it("can expand header and show overlay", () => {
//         //Expect Overlay to be "hidden" at first
//         expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);

//         //Find icon that switches between hamburger and close icon in <Header>
//         fireEvent.click(hamburgerAndCloseIconNode);

//         //Note: Unit testing is already for switching icons between the
//         //hamburger and close icon when it's clicked

//         //Expect Overlay to "expand" by switching classes assigned to <Overlay>'s elements

//         expect(wrapper.find(".overlayContainer").length).toEqual(1);

//         fireEvent.click(hamburgerAndCloseIconNode);

//         //Click again, overlayContainerHidden should show

//         expect(wrapper.find(".overlayContainer").length).toEqual(0);
//         expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);
//     });

//     it("overlay automatically closed when window is >= 768px", () => {
//         // Change the viewport to 768px.
//         //Note: Make sure it's the same as the viewports defined in scss/utilities/_variables
//         //https://stackoverflow.com/questions/60396600/set-size-of-window-in-jest-and-jest-dom-and-jsdom

//         Object.defineProperty(window, "innerWidth", {
//             writable: true,
//             configurable: true,
//             value: 768,
//         });
//         window.dispatchEvent(new Event("resize"));
//         expect(window.innerWidth).toBe(768);

//         //Hides overlay
//         expect(wrapper.find(".overlayContainerHidden").length).toEqual(1);
//     });
});
