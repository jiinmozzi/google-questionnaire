import { createSlice } from "@reduxjs/toolkit";
import { QuestionItemType, Questionnaire } from "../../types";


const initialQuestionnaireState : Questionnaire = {
    questions : []
}


const questionnaireSlice = createSlice({
    name : "questionnaire",
    initialState : initialQuestionnaireState,
    reducers : {
        createInitialQuestionnaire : (state) => {
            const questionLists = [];
            const initialQuestionItem : QuestionItemType = {
                type : "short",
                question : "",
                isRequired : false,
                isFocused : true,
                options : null,
                answer : "",
            };
            state.questions = [initialQuestionItem];
        }
    }
})

export const {
    createInitialQuestionnaire,
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;