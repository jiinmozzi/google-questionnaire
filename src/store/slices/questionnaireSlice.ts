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
            const copyingItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.id === Number(id));
            const prev = state.questions.slice(0, copyingItemIdx + 1);
            const copiedItem = {...state.questions[copyingItemIdx], id : Date.now()};
            const next = state.questions.slice(copyingItemIdx + 1);
            
            state.questions = [...prev, copiedItem, ...next];
            state.questions[copyingItemIdx].isFocused = false;
            state.focusedId = copiedItem.id;
        },
        deleteQuestion : (state, action) => {
            const {id} = action.payload;
            state.questions = state.questions.filter((item : QuestionItemType | ExplanationItemType) => item.id !== id);
        },
        toggleRequired : (state, action) => {
            const {id} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id));
            if (!item) return;
            item.isRequired = !item.isRequired;
        },
        addOption : (state, action) => {
            const {id} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            if (!item) return;
            if (item.options) item.options.push("");
        }
    }
})

export const {
    createInitialQuestionnaire,
    copyQuestion,
    deleteQuestion,
    toggleRequired,
    addOption,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;