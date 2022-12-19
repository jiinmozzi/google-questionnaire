import React from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { HOME, PREVIEW } from "../../../constants";
import { RootState } from "../../../store/slices";
import { updateAnswer } from "../../../store/slices/questionnaireSlice";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../../types";
import "./ShortQuestion.scss";

type ShortQuestionPropsType = {
    questionnaire : Questionnaire
    questionData : QuestionItemType | ExplanationItemType,
}

const ShortQuestion = ({ questionnaire, questionData } : ShortQuestionPropsType) => {
    const dispatch = useDispatch();
    const onUpdateAnswer = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateAnswer({ id : questionData.id, value : target.value }));
    }
    return (
        <div className="short-question-wrapper">
            <input 
                type="text" 
                className={ questionnaire.viewPage !== PREVIEW ? "short-question-input-readonly" : "short-question-input" } 
                onChange={onUpdateAnswer}
                value={((questionData as QuestionItemType).answer as string)}
                readOnly={ questionnaire.viewPage !== PREVIEW}
                // defaultValue={ ((questionData as QuestionItemType).answer as string) }
                placeholder="단답형 텍스트"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateAnswer : (id : number, value : string) => dispatch(updateAnswer({id, value})),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortQuestion);