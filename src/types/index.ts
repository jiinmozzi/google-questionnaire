export type QuestionItemType = {
    type : "short" | "long" | "multiple" | "checkbox" | "dropdown"
    question : string,
    isRequired : boolean,
    isFocused : boolean,
    options : string[] | null,
    answer : string | string[],
    id : number,
}

export type ExplanationItemType = {
    type : "explanation"
    title : string,
    explanation : string,
    isRequired : boolean;
    isFocused : boolean
    id : number,
}

export type Questionnaire = {
    questions : (QuestionItemType | ExplanationItemType)[],
    focusedId : number,
}
