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
let node: HTMLElement;
beforeEach(() => {
    app = render(
        <Root>
            <Header />
        </Root>
    );
    hamburgerAndCloseIcon = "hamburgerAndCloseIcon";
    node = app.getByTestId(hamburgerAndCloseIcon);
});

describe("icon that switches between hamburger and close icon functionality", () => {
    //icon that switches between hamburger and close icon when clicked
    it("has icon that switches between hamburger icon and close icon", () => {
        expect(node).toBeInTheDocument();
    });

    it("able to switch between hamburger icon and close icon when clicked", () => {
        //starts with hamburger icon
        expect(node).toHaveAttribute("src", hamburger);
        fireEvent.click(node);

        //switches to close icon
        expect(node).toHaveAttribute("src", appleClose);

        fireEvent.click(node);

        //switches back to hamburger icon
        expect(node).toHaveAttribute("src", hamburger);
    });

    //Can't be unit tested because display:none is triggered with a media query
    //;RTL/Jest dosen't seem to support it
    // it(" when screen icon that switches between hamburger and close dissapears at larger sizes", () => {
    // });
});

it("has <Overlay/> that will appear or disappear when user clicks hamburger icon", () => {
    expect(app.getByTestId("overlay")).toBeInTheDocument();
});

afterEach(cleanup);
