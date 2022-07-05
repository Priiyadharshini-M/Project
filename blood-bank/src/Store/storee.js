import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./Reducers/rootReducer";

export const storee = createStore(rootReducer, applyMiddleware(thunk))