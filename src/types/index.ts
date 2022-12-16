export type QuestionItem = {
    type : "short" | "long" | "multiple" | "checkbox" | "dropdown"
    question : string,
    isRequired : boolean,
    options : string[] | null,
    answer : string | string[],
}

export type Questionnaire = {
    questions : QuestionItem[],
}