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
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
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
        act(() => {
            fireEvent.click(hamburgerAndCloseIconNode);
        });

        //switches to close icon
        expect(hamburgerAndCloseIconNode).toHaveAttribute("src", appleClose);

        act(() => {
            fireEvent.click(hamburgerAndCloseIconNode);
        });

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

describe("<Header> and <Overlay>'s relationship / functionality", () => {
    let overlayContainer = "overlayContainer";
    let overlayContainerHidden = "overlayContainerHidden";

    it("expands header by showing overlay", () => {
        //Expect Overlay to be "hidden" at first

        expect(app.getByTestId("overlay").className).toEqual(
            overlayContainerHidden
        );

        //Find icon that switches between hamburger and close icon in <Header>
        act(() => {
            fireEvent.click(hamburgerAndCloseIconNode);
        });

        //Note: Unit testing is already for switching icons between the
        //hamburger and close icon when it's clicked

        //Expect Overlay to "expand" by switching classes assigned to <Overlay>'s elements
        expect(app.getByTestId("overlay").className).toEqual(overlayContainer);
        //NOTE: We shouldn't do .className because with RTL the idea is to NOT test the implementation details to avoid brittle tests
        //we should test what the user sees rather than "opening up the dev tools to see what the class is"
        //but this is done as a LAST RESORT
        //https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change/

        act(() => {
            fireEvent.click(hamburgerAndCloseIconNode);
        });

        //Click again, overlayContainerHidden should show
        expect(app.getByTestId("overlay").className).toEqual(
            overlayContainerHidden
        );
    });

    it("overlay automatically closes when window is >= 768px", () => {
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
        expect(app.getByTestId("overlay").className).toEqual(
            overlayContainerHidden
        );
    });
});

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

test("Apple logo redirects to / path - MemoryRouter Way", () => {
    //https://stackoverflow.com/questions/58524183/how-to-mock-history-push-with-the-new-react-router-hooks-using-jest/59451956
    const app = render(
        <Root>
            <MemoryRouter initialEntries={["/error"]} initialIndex={0}>
                <Routes />
            </MemoryRouter>
        </Root>
    );
    expect(app.getByText("ERROR 404")).toBeInTheDocument();
    act(() => {
        //Note: <Header> and <Footer> is in <App> so it's always rendered
        fireEvent.click(app.getByTestId("appleLogo"));
    });

    expect(mockHistoryPush).toHaveBeenCalledWith("/");

    //expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    //<Body> won't actualy render
});

// test("render tests", () => {
//     const app = render(
//         <Root>
//             <ReviewBox />
//         </Root>
//     );
//     console.log(app.debug());
// });
