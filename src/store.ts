import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk))
);

//used for testing
