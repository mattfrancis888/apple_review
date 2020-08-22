import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import App from "components/App";
import Root from "Root";

test("renders a message", () => {
    const { container, getByText } = render(
        <Root>
            <App />
        </Root>
    );
    //https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany
    //tobeInTheDocument responds with a type error and can be solved with import "@testing-library/jest-dom/extend-expect";

    expect(container.firstChild).toMatchInlineSnapshot(`
      <h1>Hello, World!</h1>
    `);
});

afterEach(cleanup);
//Failing to call cleanup when you've
// called render could result in a memory leak and tests
// which are not "idempotent" (which can lead to difficult to debug errors in your tests).
//https://testing-library.com/docs/react-testing-library/api#cleanup
