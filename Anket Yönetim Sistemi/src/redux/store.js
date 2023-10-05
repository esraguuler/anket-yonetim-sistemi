import { combineReducers, createStore } from "redux";
import formElementReducer from "./reducers/formElementReducer";

const rootReducer = combineReducers({
    formElements: formElementReducer
})

const store = createStore(rootReducer)

export default store