import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

import streamReducer from "./streamReducer";
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
    // form: reducer    // predefined key and pair by redux form
    form: formReducer,    // predefined key by redux form
    streams: streamReducer
})