import QuestionItemHeader from "../QuestionItemHeader";
import QuestionItemFooter from "../QuestionItemFooter";

import "./QuestionItem.scss";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { ExplanationItemType, QuestionItemType } from "../../types";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";

type QuestionItemPropsType = {
    children : ReactNode,
}

const QuestionItem = ({ children } : QuestionItemPropsType) => {
    const [questionData, setQuestionData] = useState<QuestionItemType>({
        type : "long",
        question : "",
        isRequired : false,
        isFocused : false,
        options : [],
        answer : "",
        id : Date.now(),
    });
    useEffect(() => {
        if ( !React.isValidElement(children) ) return;
        setQuestionData(children.props.questionData);
    }, [children]) 
    useEffect(() => {}, [])
    return (
        <div className="question-item-wrapper">
            <div className="question-item-focused"></div>
            <div className="question-item-content">
                <QuestionItemHeader questionData={ questionData }/>
                {children}
                <QuestionItemFooter questionData={ questionData }/>
            </div>
        </div>
    )
}

const mapDisptachToProps = (dispatch : Dispatch) => {
    return {

    }
}

const mapStateToProps = (state : RootState) => {
    return {

    }
}
export default QuestionItem;