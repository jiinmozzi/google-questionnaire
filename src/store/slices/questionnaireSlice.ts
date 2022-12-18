import { createSlice } from "@reduxjs/toolkit";
import { CHECKBOX, DROPDOWN, EXPLANATION, LONG, MULTIPLE, SHORT } from "../../constants";
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
        },
        deleteOption : (state, action) => {
            const {idx, id} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            if (!item) return;
            if (item.options) item.options.splice(idx, 1);
        },
        updateQuestionType : (state, action) => {
            const {id, type} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            if (!item) return;
            item.type = type;
            
            if ((type === MULTIPLE || type === CHECKBOX || type === DROPDOWN)){
                item.options = item.options || [];
            }   else {
                item.options = null;
            }
        },
        createQuestion : (state) => {
            const currentFocusedItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.isFocused === true);
            const prev = state.questions.slice(0, currentFocusedItemIdx + 1);
            const newQuestion : QuestionItemType = {
                type : SHORT,
                question : "",
                isRequired : false,
                isFocused : true,
                options : null,
                answer : "",
                id : Date.now(),
            }
            const next = state.questions.slice(currentFocusedItemIdx + 1);
            state.questions = [...prev, newQuestion, ...next];
            
            // if there is no focused item, i.e) length = 0
            if (currentFocusedItemIdx !== -1){
                state.questions[currentFocusedItemIdx].isFocused = false;
            }
        },
        updateQuestionText : (state, action) => {
            const {id, value} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            item.question = value;
        }
    }
})

export const {
    createInitialQuestionnaire,
    copyQuestion,
    deleteQuestion,
    toggleRequired,
    addOption,
    updateQuestionType,
    deleteOption,
    createQuestion,
    updateQuestionText
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;