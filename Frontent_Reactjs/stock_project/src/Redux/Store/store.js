import { rootReducer } from "../Reducer/Reducer";
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"

const state = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default state;