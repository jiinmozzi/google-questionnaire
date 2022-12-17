export type QuestionItemType = {
    type : "short" | "long" | "multiple" | "checkbox" | "dropdown"
    question : string,
    isRequired : boolean,
    isFocused : boolean,
    options : string[] | null,
    answer : string | string[],
}

export type ExplanationItemType = {
    type : "explanation"
    title : string,
    explanation : string,
    isFocused : boolean
}

export type Questionnaire = {
    questions : (QuestionItemType | ExplanationItemType)[],
}
