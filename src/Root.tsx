//THIS FILE IS USED FOR CORE RE-USABILITY; SPECIFICALLY FOR JEST/ENZYME TESTING
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     reducers,
//     composeEnhancers(applyMiddleware(reduxThunk))
// );
//The above will work if typescript is not integrated. Must use below
// const store = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(reduxThunk))
// );

// export default (props: any) => {
//     return <Provider store={store}>{props.children}</Provider>;
// };

interface IProps {
    initialState?: {};
    //Optional property so that not every file has to use initialState (initialState is used for testing)
    children: any;
    // any other props that come into the component
}
export default ({ initialState = {}, children }: IProps) => {
    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(reduxThunk))
    );

    return <Provider store={store}>{children}</Provider>;
};
