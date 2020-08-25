import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router";
import Root from "Root";
import Body from "components/Body";

afterEach(cleanup);
describe("<Routes> has valid paths", () => {
    //https://reactrouter.com/web/guides/testing
    //Use MemoryRouter instead of Router for testing;
    //freecodecamp uses <Router>; which is a mistake

    //Set up example with memoryrouter:
    //https://stackoverflow.com/questions/59892304/cant-get-memoryrouter-to-work-with-testing-library-react

    test("Shows <Body> at path /", () => {
        //https://stackoverflow.com/questions/45591812/how-can-you-set-path-of-match-with-memoryrouter-and-jest-not-location-or-histo
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
