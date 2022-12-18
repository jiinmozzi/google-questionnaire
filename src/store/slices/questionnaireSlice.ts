import { createSlice } from "@reduxjs/toolkit";
import { EXPLANATION } from "../../constants";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";


const initialQuestionnaireState : Questionnaire = {
    questions : [],
    focusedId : Date.now(),
}


const questionnaireSlice = createSlice({
    name : "questionnaire",
    initialState : initialQuestionnaireState,
    reducers : {
        createInitialQuestionnaire : (state) => {
            const initialQuestionItem : QuestionItemType = {
                type : "short",
                question : "",
                isRequired : false,
                isFocused : true,
                options : null,
                answer : "",
                id : initialQuestionnaireState.focusedId,
            };
            state.questions = [initialQuestionItem];
        },
        copyQuestion : (state, action) => {
            const {id} = action.payload;
            console.log(id);
            console.log(state.questions)
            const copyingItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.id === Number(id));
            console.log(copyingItemIdx)
            const prev = state.questions.slice(0, copyingItemIdx + 1);
            const copiedItem = {...state.questions[copyingItemIdx]};
            const next = state.questions.slice(copyingItemIdx + 1);
            console.log(prev);
            console.log(copiedItem) 
            console.log(next);
            state.questions = [...prev, copiedItem, ...next];
        }
    }
})

export const {
    createInitialQuestionnaire,
    copyQuestion,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;