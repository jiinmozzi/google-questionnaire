import { combineReducers } from "@reduxjs/toolkit";
import questionnaireReducer from "./questionnaireSlice";

const rootReducer = combineReducers({
    questionnaireState : questionnaireReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;