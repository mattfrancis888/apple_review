import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Header from "components/Header";
import Overlay from "components/Overlay";
import hamburger from "img/hamburger.png";
import appleClose from "img/appleClose.png";
import Root from "Root";

//cannot import store from index, it will throw a compile error.

let wrapper: ReactWrapper;

beforeEach(() => {
    //https://stackoverflow.com/questions/59191129/enzyme-jest-react-testing-shallow-connected-component-with-react-redux-6
    //If upgrading to redux 7, below is outdated. Check link above.
    // console.log(shallow(<Header store={store} />).children().dive().debug());
    // console.log(shallow(<Header store={store} />).children().debug());
    //dive() is required to get into the contents of <Header>;

    //https://github.com/enzymejs/enzyme/issues/2202
    //Issue with enzyme 3. shallow(<Root><COmponent></Root>) will not work.
    //Must use mount.
    //Other wise will throw
    //Invariant Violation: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
    wrapper = mount(
        <Root>
            <Header />
        </Root>
    );
});

describe("hamburger and close icon functionality", () => {
    it("has icon that switches between hamburger icon and close icon", () => {
        expect(wrapper.find(".hamburgerAndCloseIcon").length).toEqual(1);
    });

    it("able to switch between hamburger icon and close icon when clicked", () => {
        let hamburgerAndCloseIconClass = ".hamburgerAndCloseIcon";

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
});

it("has Overlay that will appear when user clicks hamburger icon", () => {
    expect(wrapper.find(Overlay).length).toEqual(1);
});

afterEach(() => {
    //No need to unmount if shallow is used
    wrapper.unmount();
});
