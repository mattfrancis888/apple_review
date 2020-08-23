import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router";
import Root from "Root";
import Body from "components/Body";

describe("<Routes> has valid paths", () => {
    //https://reactrouter.com/web/guides/testing
    //Use MemoryRouter instead of Router for testing;
    //freecodecamp uses <Router>; which is a mistake

    //Set up example with memoryrouter:
    //https://stackoverflow.com/questions/59892304/cant-get-memoryrouter-to-work-with-testing-library-react

    //FIX ME: Supposed to test <App> but <MemoryRouter>'s initial entries will not work
    //because of <Router> in <App/>

    test("Shows <Body> at path /", () => {
        const app = render(
            <Root>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <Route exact path="/" render={() => <Body />} />
                </MemoryRouter>
            </Root>
        );

        expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    });

    it("invalid path check", () => {
        const app = render(
            <MemoryRouter initialEntries={["/randomUrl"]} initialIndex={0}>
                <Route path="/" render={() => null} />
            </MemoryRouter>
        );

        expect(app.queryByTestId("bodyContent")).not.toBeInTheDocument();
    });
});