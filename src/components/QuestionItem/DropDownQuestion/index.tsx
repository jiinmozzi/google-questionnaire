import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../store/slices';
import { addOption, addOtherOption, deleteOption, updateOption } from '../../../store/slices/questionnaireSlice';

import { ExplanationItemType, QuestionItemType, Questionnaire } from '../../../types';
import "./DropDownQuestion.scss";

type DropDownQuestionChoicePropsType = {
    questionnaire : Questionnaire,
    idx : number,
    id : number,
    options : string[],
}

type DropDownQuestionPropsType = {
    questionnaire : Questionnaire,
    questionData : QuestionItemType | ExplanationItemType,
}

const DropDownQuestionChoice = ({questionnaire, idx, id, options} : DropDownQuestionChoicePropsType) => {
    const dispatch = useDispatch();

    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }

    const onUpdateOption = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateOption({ idx, id, value : target.value }));
    }

    return (
        <div className="dropdown-question-choice-wrapper">
            <label 
                htmlFor={`dropdown-${idx}`} 
                className="dropdown-question-label">
                {idx + 1}
            </label>
            <input 
                className={questionnaire.focusedId === id ? "dropdown-question-input" : "dropdown-question-input dropdown-unfocused"}
                type="text" 
                id={`dropdown-${idx}`} 
                onChange={onUpdateOption}
                value={ options[idx] }
                placeholder={`옵션 ${idx+1}`}
            />
            { idx > 0 && questionnaire.focusedId === id && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
        </div>
    )
}

const DropDownQuestion = ({ questionnaire, questionData } : DropDownQuestionPropsType) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }
    return (
        <div className="dropdown-question-wrapper">
            {((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                return <DropDownQuestionChoice questionnaire={questionnaire} idx={idx} id={questionData.id} options={ ((questionData as QuestionItemType).options) as string[] }/>
            })}
            { questionData.id === questionnaire.focusedId && 
                <div className="dropdown-add-indicator">
                    <label 
                        htmlFor={`dropdown-${((questionData as QuestionItemType).options as string[]).length}`} 
                        className="dropdown-question-label">
                        {((questionData as QuestionItemType).options as string[]).length + 1}
                    </label>
                    <div className="dropdown-add-div">
                        <span id="add-option" onClick={onAddOption}>옵션 추가</span>&nbsp;
                    </div>
                </div>
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        addOption : (id : number) => dispatch(addOption(id)),
        addOtherOption : (id : number) => dispatch(addOtherOption(id)),
        deleteOption : (idx : number, id : number) => dispatch(deleteOption({idx, id})),
        updateOption : (idx : number, id : number, value : string) => dispatch(updateOption({idx, id, value}))
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownQuestion);