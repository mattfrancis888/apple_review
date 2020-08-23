import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Header from "components/Header";
import Overlay from "components/Overlay";
import hamburger from "img/hamburger.png";
import appleClose from "img/appleClose.png";
import Root from "Root";

//Unit test: Tests "one thing"
//Integration test: Tests "many things"
let wrapper: ReactWrapper;

beforeEach(() => {
    //Regarding Using <Provider> given by Redux and Enzyme:
    //https://stackoverflow.com/questions/59191129/enzyme-jest-react-testing-shallow-connected-component-with-react-redux-6
    //If upgrading to redux 7, below is outdated. Check link above.
    // console.log(shallow(<Header store={store} />).children().dive().debug());
    // console.log(shallow(<Header store={store} />).children().debug());
    //dive() is required to get into the contents of <Header>;

    //https://github.com/enzymejs/enzyme/issues/2202
    //Issue with enzyme 3. shallow(<Root><Component></Root>) will not work.
    //Must use mount.
    //Other wise will throw
    //Invariant Violation: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
    wrapper = mount(
        <Root>
            <Header />
        </Root>
    );
});

describe("icon that switches between hamburger and close icon functionality", () => {
    const hamburgerAndCloseIconClass = ".hamburgerAndCloseIcon";
    //icon that switches between hamburger and close icon when clicked
    it("has icon that switches between hamburger icon and close icon", () => {
        expect(wrapper.find(hamburgerAndCloseIconClass).length).toEqual(1);
    });

    it("able to switch between hamburger icon and close icon when clicked", () => {
        //starts with hamburger icon
        expect(wrapper.find(hamburgerAndCloseIconClass).prop("src")).toEqual(
            hamburger
        );

        wrapper.find(hamburgerAndCloseIconClass).simulate("click");

        //switches to close icon
        expect(wrapper.find(hamburgerAndCloseIconClass).prop("src")).toEqual(
            appleClose
        );

        wrapper.find(hamburgerAndCloseIconClass).simulate("click");

        //switches back to hamburger icon
        expect(wrapper.find(hamburgerAndCloseIconClass).prop("src")).toEqual(
            hamburger
        );

        //mount.update() is not needed becasue it automatically connects to our redux store
    });
    //Can't be unit tested because display:none is triggered with a media query
    //; Enzyme/Jest dosen't seem to support it
    // it(" when screen icon that switches between hamburger and close dissapears at larger sizes", () => {
    //     expect(wrapper.find(Overlay).length).toEqual(1);

    //     // Change the viewport to 800px.
    //     global.innerWidth = 768;

    //     // Trigger the window resize event.
    //     global.dispatchEvent(new Event("resize"));
    //     //Expect icon to dissapear when greater than or equalt o 768 pixels

    //     expect(wrapper.find(hamburgerAndCloseIconClass)).toHaveProperty(
    //         "display",
    //         "none"
    //     );
    // });
});

it("has <Overlay/> that will appear or disappear when user clicks hamburger icon", () => {
    expect(wrapper.find(Overlay).length).toEqual(1);
});

afterEach(() => {
    //No need to unmount if shallow is used
    wrapper.unmount();
});
