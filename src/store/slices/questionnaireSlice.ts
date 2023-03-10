import { createSlice } from "@reduxjs/toolkit";
import { CHECKBOX, DROPDOWN, EMPTY, EXPLANATION, HEADER, HEADEREXPLANATION, HOME, LONG, MULTIPLE, SHORT } from "../../constants";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
const initialQuestionnaireState : Questionnaire = {
    header : {
        title : "제목 없는 설문지",
        explanation : "",
        titleStyles : [],
        explanationStyles : [],
    },
    questions : [],
    focusedId : HEADER,
    viewPage : HOME,
}

const questionnaireSlice = createSlice({
    name : "questionnaire",
    initialState : initialQuestionnaireState,
    reducers : {
        createInitialQuestion : (state) => {
            const initialQuestionItem : QuestionItemType = {
                type : "short",
                question : "",
                isRequired : false,
                options : null,
                answer : "",
                id : Date.now(),
            };
            state.focusedId = HEADER;
            state.questions = [initialQuestionItem];
        },
        copyQuestion : (state, action) => {
            const {id} = action.payload;
            const copyingItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.id === id);
            const prev = state.questions.slice(0, copyingItemIdx + 1);
            const copiedItem = {...state.questions[copyingItemIdx], id : Date.now()};
            const next = state.questions.slice(copyingItemIdx + 1);
            
            state.questions = [...prev, copiedItem, ...next];
            state.focusedId = copiedItem.id;
        },
        deleteQuestion : (state, action) => {
            const {id} = action.payload;
            const deletedItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.id === id);
            if (deletedItemIdx > 0){
                state.focusedId = state.questions[deletedItemIdx-1].id;
            }   else if (state.questions.length > 1){
                state.focusedId = state.questions[1].id;
            }   else {
                state.focusedId = HEADER;
            };
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
        addOtherOption : (state, action) => {
            const {id} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            if (!item) return;
            if (item.options) item.options.push("기타...");
        },
        updateOption : (state, action) => {
            const {idx, id, value} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            if (!item) return;
            if (item.options) item.options[idx] = value;
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
                item.options = item.options || [""];
            }   else {
                item.options = null;
            }
            switch (type){
                case CHECKBOX:
                    item.answer = [];
                    break;
                case DROPDOWN:
                    item.answer = EMPTY;
                    break;
                case MULTIPLE:
                    item.answer = EMPTY;
                    break;
                case SHORT:
                    item.answer = "";
                    break;
                case LONG:
                    item.answer = "";
                    break;
            }
        },
        createQuestion : (state) => {
            const currentFocusedItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.id === state.focusedId);
            const prev = state.questions.slice(0, currentFocusedItemIdx + 1);
            const newQuestion : QuestionItemType = {
                type : SHORT,
                question : "",
                isRequired : false,
                options : null,
                answer : "",
                id : Date.now(),
            }
            state.focusedId = newQuestion.id;
            const next = state.questions.slice(currentFocusedItemIdx + 1);
            state.questions = [...prev, newQuestion, ...next];
            
        },
        createExplanation : (state) => {
            const currentFocusedItemIdx = state.questions.findIndex((item : QuestionItemType | ExplanationItemType) => item.id === state.focusedId);
            const prev = state.questions.slice(0, currentFocusedItemIdx + 1);
            const newQuestion : ExplanationItemType = {
                type : EXPLANATION,
                title : "",
                explanation : "",
                isRequired : false,
                id : Date.now(),
            }
            state.focusedId = newQuestion.id;

            const next = state.questions.slice(currentFocusedItemIdx + 1);
            state.questions = [...prev, newQuestion, ...next];
            
        },

        updateQuestionText : (state, action) => {
            const {id, value} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;
            item.question = value;
        },

        updateHeaderTitle : (state, action) => {
            const {value} = action.payload;
            state.header.title = value;
        },

        updateAnswer : (state, action) => {
            const {id, value} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as QuestionItemType;

            // 질문의 답이 하나일 경우
            if (typeof(item.answer) === 'string'){
                item.answer = value;
            }   else if (typeof item.answer === 'number'){
                item.answer = value;
            }   else {
                const answerIndex = item.answer.indexOf(value);
                if (answerIndex === -1){
                    item.answer.push(value);
                }   else {
                    item.answer.splice(answerIndex, 1);
                }
            }
        },

        updateHeaderExplanation : (state, action) => {
            const {value} = action.payload;
            state.header.explanation = value;
        },
        updateExplanationTitle : (state, action) => {
            const {id, value} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as ExplanationItemType;
            item.title = value;   
        },
        updateExplanationContent : (state, action) => {
            const {id, value} = action.payload;
            const item = state.questions.find((item : QuestionItemType | ExplanationItemType) => item.id === Number(id)) as ExplanationItemType;
            item.explanation = value;
        },
        updateFocus : (state, action) => {
            const {id} = action.payload;
            state.focusedId = id;
        },
        updateViewPage : (state, action) => {
            const {page} = action.payload;
            state.viewPage = page;
        },
        resetQuesionnaireAnswers : (state) => {
            state.questions.forEach((question : QuestionItemType | ExplanationItemType) => {
                // when selected is either SHORT or LONG
                if (question.type !== EXPLANATION && typeof(question.answer) === "string"){
                    question.answer = "";
                    return;
                }
                // when selected is either MULTIPLE or DROPDOWN
                if (question.type !== EXPLANATION && typeof(question.answer) === "number"){
                    question.answer = EMPTY;
                    return;
                }

                // when CHECKBOX
                if (question.type !== EXPLANATION)  question.answer = [];
            })
        },
        updateItemOrder : (state, action) => {
            const {draggedIndex, draggedOverIndex} = action.payload;
            const item = state.questions[draggedIndex];
            state.questions.splice(draggedIndex, 1);
            state.questions.splice(draggedOverIndex, 0, item);
        },
        updateOptionOrder : (state, action) => {
            const {draggedIndex, draggedOverIndex, id} = action.payload;
            const item = state.questions.find((question : QuestionItemType | ExplanationItemType) => question.id === id) as QuestionItemType;
            
            if (item.options){
                const dragged = item.options[draggedIndex];
                item.options.splice(draggedIndex, 1);
                item.options.splice(draggedOverIndex, 0, dragged);
            }
        },
        
        updateHeaderStyles : (state, action) => {
            const {id, option} = action.payload;
            
            if (id === HEADER){
                if (state.header.titleStyles.includes(option)){
                    state.header.titleStyles = state.header.titleStyles.filter((style : string) => style !== option);
                }   else {
                    state.header.titleStyles.push(option);
                }
                return;
            }   

            if (id === HEADEREXPLANATION){
                if (state.header.explanationStyles.includes(option)){
                    state.header.explanationStyles = state.header.explanationStyles.filter((style : string) => style !== option);
                }   else {
                    state.header.explanationStyles.push(option);
                }
                return;
            }
        },
        resetHeaderStyles : (state, action) => {
            const {id} = action.payload;
            if (id === HEADER){
                state.header.titleStyles = [];
                return
            }
            if (id === HEADEREXPLANATION){
                state.header.explanationStyles = [];
                return
            }
        }
    }
})

export const {
    createInitialQuestion,
    copyQuestion,
    deleteQuestion,
    toggleRequired,
    addOption,
    addOtherOption,
    updateQuestionType,
    deleteOption,
    createQuestion,
    createExplanation,
    updateQuestionText,
    updateHeaderTitle,
    updateAnswer,
    updateHeaderExplanation,
    updateExplanationTitle,
    updateExplanationContent,
    updateFocus,
    updateOption,
    updateViewPage,
    resetQuesionnaireAnswers,
    updateItemOrder,
    updateOptionOrder,
    updateHeaderStyles,
    resetHeaderStyles
} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;