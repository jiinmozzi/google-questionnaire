import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./MultipleQuestion.scss";
import { ExplanationItemType, QuestionItemType } from '../../../types';
import React from 'react';
import { Dispatch } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/slices';
import { addOption, deleteOption, updateOption } from '../../../store/slices/questionnaireSlice';

type MultipleQuestionChoicePropsType = {
    id : number,
    idx : number,
    options : string[],
}

type MultipleQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const MultipleQuestionChoice = ( {idx, id, options} : MultipleQuestionChoicePropsType ) => {
    const dispatch = useDispatch();
    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }

    const onUpdateOption = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateOption({ idx, id, value : target.value }));
    }

    return (
        <div className="multiple-question-choice-wrapper">
            <label htmlFor={`choice-${idx}`} className="multiple-question-label">
                <RadioButtonUncheckedIcon className="multiple-question-mark"/>    
            </label>
            {/* <RadioButtonUncheckedIcon className="multiple-question-mark"/> */}
            <input 
                className="multiple-question-input" 
                type="text" 
                onChange={onUpdateOption}
                value={ options[idx] }
                id={`choice-${idx}`} 
                placeholder={`옵션 ${idx+1}`}
                />
            { idx > 0 && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
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
            {((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                return <MultipleQuestionChoice id={questionData.id} idx={idx} options={ ((questionData as QuestionItemType).options) as string[] }/>    
            })}
            
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
        deleteOption : (idx : number, id : number) => dispatch(deleteOption({idx, id})),
        updateOption : (idx : number, id : number, value : string) => dispatch(updateOption({idx, id, value}))
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleQuestion);
