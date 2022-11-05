import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, mailSendReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducres";

const middleware = [thunk];

const reducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    mail: mailSendReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)) 
)

export default store;