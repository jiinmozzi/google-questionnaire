export type QuestionItemType = {
    type : "short" | "long" | "multiple" | "checkbox" | "dropdown"
    question : string,
    isRequired : boolean,
    options : string[] | null,
    answer : string | number | number[],
    id : number,
}

export type ExplanationItemType = {
    type : "explanation"
    title : string,
    explanation : string,
    isRequired : boolean;
    id : number,
}

export type QuestionnaireHeader = {
    title : string,
    explanation : string,
}

export type Questionnaire = {
    header : QuestionnaireHeader
    questions : (QuestionItemType | ExplanationItemType)[],
    focusedId : number,
    viewPage : "home" | "preview" | "response",
}
