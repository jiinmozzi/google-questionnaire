import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { HOME, PREVIEW } from '../../../constants';
import { RootState } from '../../../store/slices';
import { addOption, addOtherOption, deleteOption, updateAnswer, updateOption } from '../../../store/slices/questionnaireSlice';
import { SelectChangeEvent } from '@mui/material/Select';

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
type DropDownSelectorPropsType = {
    id : number,
    options : string[],
    questionnaire : Questionnaire,
}

// DropDown on Home page
const DropDownQuestionChoice = ({ questionnaire, idx, id, options } : DropDownQuestionChoicePropsType) => {
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
                className={questionnaire.viewPage === HOME ? "dropdown-question-input dropdown-question-input-readonly" : questionnaire.focusedId === id ? "dropdown-question-input" : "dropdown-question-input dropdown-unfocused"}
                type="text" 
                id={`dropdown-${idx}`}
                readOnly={questionnaire.viewPage !== HOME}
                onChange={onUpdateOption}
                value={ options[idx] }
                placeholder={`옵션 ${idx+1}`}
            />
            { questionnaire.viewPage === HOME && idx > 0 && questionnaire.focusedId === id && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
        </div>
    )
}

// DropDown on PREVIEW Page and RESPONSE Page
const DropDownSelector = ({ questionnaire, id, options } : DropDownSelectorPropsType) => {
    const dispatch = useDispatch();
    const onUpdateAnswer = (e : SelectChangeEvent) => {
        dispatch(updateAnswer({ id , value : Number(e.target.value) }));
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          onChange={onUpdateAnswer}
          defaultValue="선택"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="선택">
            <em>선택</em>
          </MenuItem>
          {options.map((option : string, idx : number) => {
            return <MenuItem value={String(idx)} key={idx}>{option}</MenuItem>
          })}
          
        </Select>
      </FormControl>
    )
}

const DropDownQuestion = ({ questionnaire, questionData } : DropDownQuestionPropsType) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }
    return (
        <div className="dropdown-question-wrapper">
            { questionnaire.viewPage !== HOME && <DropDownSelector id={questionData.id} options={((questionData as QuestionItemType).options as string[])} questionnaire={questionnaire}/> }

            { questionnaire.viewPage === HOME && ((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                return <DropDownQuestionChoice questionnaire={questionnaire} idx={idx} id={questionData.id} options={ ((questionData as QuestionItemType).options) as string[] }/>
            })}

            { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && 
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
        updateOption : (idx : number, id : number, value : string) => dispatch(updateOption({idx, id, value})),
        updateAnswer : (id : number, value : number) => dispatch(updateAnswer({id, value}))
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownQuestion);