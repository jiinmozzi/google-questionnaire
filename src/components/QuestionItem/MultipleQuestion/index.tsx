import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./MultipleQuestion.scss";
import { ExplanationItemType, QuestionItemType } from '../../../types';
import React from 'react';
import { Dispatch } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/slices';
import { addOption } from '../../../store/slices/questionnaireSlice';

type MultipleQuestionChoicePropsType = {
    idx : number
}

type MultipleQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const MultipleQuestionChoice = ( {idx} : MultipleQuestionChoicePropsType ) => {
    return (
        <div className="multiple-question-choice-wrapper">
            <label htmlFor={`choice-${idx}`} className="multiple-question-label">
                <RadioButtonUncheckedIcon className="multiple-question-mark"/>    
            </label>
            {/* <RadioButtonUncheckedIcon className="multiple-question-mark"/> */}
            <input className="multiple-question-input" type="text" id={`choice-${idx}`} defaultValue={`옵션 ${idx}`}/>
            <CloseRoundedIcon className="choice-delete-icon"/>
        </div>
    )
}

const MultipleQuestion = ({ questionData } : MultipleQuestionPropsType) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }

    return (
        <div className="multiple-question-wrapper">
            {((questionData as QuestionItemType).options as string[]).map((option : string) => {
                return <MultipleQuestionChoice idx={1}/>    
            })}
            <MultipleQuestionChoice idx={1}/>
            <MultipleQuestionChoice idx={2}/>
            <div className="choice-add-indicator">
                <RadioButtonUncheckedIcon className="choice-add-icon"/>    
                <div className="choice-add-div">
                    <span id="add-option" onClick={onAddOption}>옵션 추가</span>&nbsp;
                    <span>또는</span>&nbsp;
                    <span id="add-others">'기타' 추가</span>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        addOption : (id : number) => dispatch(addOption(id)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleQuestion);
