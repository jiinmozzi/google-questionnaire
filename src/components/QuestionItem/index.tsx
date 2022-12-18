import QuestionItemHeader from "../QuestionItemHeader";
import QuestionItemFooter from "../QuestionItemFooter";

import "./QuestionItem.scss";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { updateFocus } from "../../store/slices/questionnaireSlice";
import { connect, useDispatch } from "react-redux";

type QuestionItemPropsType = {
    children : ReactNode,
    questionnaire : Questionnaire
}

const QuestionItem = ({ questionnaire, children } : QuestionItemPropsType) => {
    const dispatch = useDispatch();
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
    
    const onUpdateFocus = (e : React.MouseEvent) => {
        dispatch(updateFocus({id : questionData.id}));
    }
    
    return (
        <div className="question-item-wrapper" onMouseDown={onUpdateFocus}>
            { questionnaire.focusedId === questionData.id && <div className="question-item-focused"></div>}
            <form className="question-item-content">
                <QuestionItemHeader questionData={ questionData }/>
                {children}
                <QuestionItemFooter questionData={ questionData }/>
            </form>
        </div>
    )
}

const mapDisptachToProps = (dispatch : Dispatch) => {
    return {
        updateFocus : ( id : number ) => dispatch(updateFocus(id)),
    }
}

const mapStateToProps = (state : RootState) => {
    return {
        questionnaire : state.questionnaireState,
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(QuestionItem);