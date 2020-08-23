import React from "react";
import "@testing-library/jest-dom/extend-expect";
//Do not forget to include extend ^^ otherwise expects would not work
//https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany
import { render, cleanup } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router";
import App from "components/App";
import Root from "Root";
import Body from "components/Body";

//RTL follows Black Box Functional Testing
//Black-box testing is a method of software testing that
//examines the functionality of an application without peering into its internal structures or workings.
// /https://stackoverflow.com/questions/55151142/react-testing-library-why-use-test-id

//https://www.freecodecamp.org/news/8-simple-steps-to-start-testing-react-apps-using-react-testing-library-and-jest/#5-testing-react-redux

it("has <Header>", () => {
    const app = render(
        <Root>
            <App />
        </Root>
    );

    //Do not do what you did in enzyme:
    //expect(wrapper.find(ChildComponent)).toHaveLength(1)
    //You shouldn't check if your child component is rendered or not because it's testing
    // implementation details which testing library doesn't encourage you to do.
    //Instead, we should check if the elements that belong to the ChildComponent it's in the DOM.
    //https://stackoverflow.com/questions/60041468/in-react-testing-library-how-do-i-check-that-a-child-component-is-rendered

    //expect(queryByText(/some text/i).toBeInTheDocument();

    expect(app.getByTestId("defaultHeader")).toBeInTheDocument();
    //the use of data-testid designates that it is
    // unambiguous and was added deliberately to make testing easier,
    //while selectors can be ambiguous and be accidentally changed when the implementation is changed.
    // https://stackoverflow.com/questions/55151142/react-testing-library-why-use-test-id
    // expect(container.firstChild).toMatchInlineSnapshot(`
    //   <h1>Hello, World!</h1>
    // `);
});

describe("<App> has valid paths", () => {
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
                <MemoryRouter initialEntries={["/random"]} initialIndex={0}>
                    <App />
                </MemoryRouter>
            </Root>
        );

        expect(app.getByTestId("bodyContent")).toBeInTheDocument();
    });

    // it("invalid path check", () => {
    //     let wrapper = mount(
    //         <MemoryRouter initialEntries={["/randomUrl"]} initialIndex={0}>
    //             <Route path="/" render={() => null} />
    //         </MemoryRouter>
    //     );
    //     expect(wrapper.find(Body)).toHaveLength(0);
    // });
});

afterEach(cleanup);
//Failing to call cleanup when you've
// called render could result in a memory leak and tests
// which are not "idempotent" (which can lead to difficult to debug errors in your tests).
//https://testing-library.com/docs/react-testing-library/api#cleanup
