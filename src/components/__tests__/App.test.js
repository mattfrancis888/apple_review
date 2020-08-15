import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "components/App";
import Header from "components/Header";
it("shows header", () => {
    const wrapped = shallow(<App />);
    expect(wrapped.find(Header).length).toEqual(1);
    //Need to clean up or else our tester will be slow
});
