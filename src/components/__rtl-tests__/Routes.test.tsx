import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Routes from "components/Routes";
import { Router } from "react-router-dom";
import history from "browserHistory";
import Root from "Root";
afterEach(cleanup);
describe("<Routes> has valid paths", () => {
    //https://reactrouter.com/web/guides/testing
    //Use MemoryRouter instead of Router for testing;
    //freecodecamp uses <Router>; which is a mistake
    //https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/#5-testing-react-redux

    //Set up example with memoryrouter:
    //https://stackoverflow.com/questions/59892304/cant-get-memoryrouter-to-work-with-testing-library-react
    //I don't think async is needed
    //Freecodecamp example:
    const renderWithRouter = (component: any) => {
        return {
            ...render(
                <Root>
                    <Router history={history}>{component}</Router>
                </Root>
            ),
        };
    };

    it("Shows <Body> at path / - FreeCodeCamp Router Way", () => {
        const app = renderWithRouter(<Routes />);
        expect(app.getByTestId("bodyContent")).toBeInTheDocument();
        // act(() => {
        //     fireEvent.click(app.getByTestId("appleLogo"));
        // });
        //  expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    });

    //Memory router example:
    test("Shows <Body> at path / - MemoryRouter Way", () => {
        const app = render(
            <Root>
                <MemoryRouter initialEntries={["/"]} initialIndex={0}>
                    <Routes />
                </MemoryRouter>
            </Root>
        );
        expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    });

    test("Shows <Error> at path /error - MemoryRouter Way", () => {
        const app = render(
            <Root>
                <MemoryRouter initialEntries={["/error"]} initialIndex={0}>
                    <Routes />
                </MemoryRouter>
            </Root>
        );
        expect(app.getByText("ERROR 404")).toBeInTheDocument();
    });
});
