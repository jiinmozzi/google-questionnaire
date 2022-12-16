import { createSlice } from "@reduxjs/toolkit";
import { QuestionItem, Questionnaire } from "../../types";


const initialQuestionnaireState : Questionnaire = {
    questions : []
}

const questionnaireSlice = createSlice({
    name : "difficulty",
    initialState : initialQuestionnaireState,
    reducers : {
        
    }
})

export const {
    
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;