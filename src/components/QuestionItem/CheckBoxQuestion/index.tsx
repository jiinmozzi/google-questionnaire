import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import "./CheckBoxQuestion.scss"
import { ExplanationItemType, QuestionItemType, Questionnaire } from '../../../types';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/slices';
import { Dispatch } from 'redux';
import { addOption, addOtherOption, deleteOption, updateAnswer, updateOption } from '../../../store/slices/questionnaireSlice';
import React from 'react';
import { HOME, PREVIEW } from '../../../constants';

type CheckBoxQuestionChoicePropsType = {
    questionnaire : Questionnaire
    idx : number,
    id : number,
    options : string[],
    answer : number[],
}

type CheckBoxQuestionPropsType = {
    questionnaire : Questionnaire,
    questionData : QuestionItemType | ExplanationItemType,
}

const CheckBoxQuestionChoice = ({ answer, questionnaire, idx, id, options } : CheckBoxQuestionChoicePropsType) => {
    const dispatch = useDispatch();
    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }

    const onUpdateOption = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateOption({ idx, id, value : target.value }));
    }

    const onUpdateAnswer = (e : React.MouseEvent ) => {
        if (questionnaire.viewPage === PREVIEW){
            dispatch(updateAnswer({ id , value : idx }));    
        }
    }

    return (
        <div className="checkbox-question-choice-wrapper" onClick={onUpdateAnswer}>
            <label htmlFor={`choice-${idx}`} className="checkbox-question-label">
                {  answer.includes(idx) ? <CheckBoxRoundedIcon onClick={onUpdateAnswer} className="checkbox-question-mark"/> 
                    : <CheckBoxOutlineBlankRoundedIcon onClick={onUpdateAnswer} className="checkbox-question-mark"/> 
                }
            </label>
            {/* <RadioButtonUncheckedIcon className="checkbox-question-mark"/> */}
            <input 
                className={ questionnaire.viewPage !== HOME ? "checkbox-question-input checkbox-question-input-readonly" 
                        : questionnaire.focusedId === id ? "checkbox-question-input" 
                    : "checkbox-question-input checkbox-unfocused"
                }
                type="text" 
                id={`choice-${idx}`}
                onChange={onUpdateOption}
                value={ options[idx] }
                readOnly = { questionnaire.viewPage !== HOME || options[idx] === '기타...' }
                placeholder={`옵션 ${idx+1}`}
            />
            { questionnaire.viewPage === HOME && idx > 0 && questionnaire.focusedId === id && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
        </div>
    )
}

const CheckBoxQuestion = ({ questionnaire, questionData } : CheckBoxQuestionPropsType ) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }
    const onAddOtherOption = ( e : React.MouseEvent ) => {
        dispatch(addOtherOption({ id : questionData.id }));
    }   
    return (
        <div className="checkbox-question-wrapper">
            {((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                return <CheckBoxQuestionChoice answer={(questionData as QuestionItemType).answer as number[]} questionnaire={questionnaire} idx={idx} id={questionData.id} options={ ((questionData as QuestionItemType).options) as string[] }/>    
            })}
            { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && 
                <div className="checkbox-add-indicator">
                    <CheckBoxOutlineBlankRoundedIcon className="choice-add-icon"/>    
                    <div className="choice-add-div">
                        <span id="add-option" onClick={onAddOption}>옵션 추가</span>&nbsp;
                        {   !(questionData as QuestionItemType).options?.includes('기타...') &&
                            <>
                                <span>또는</span>&nbsp;
                                <span id="add-others" onClick={onAddOtherOption}>'기타' 추가</span>
                            </>
                        }
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
        updateAnswer : (id : number, value : number) => dispatch(updateAnswer({id, value})),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxQuestion);
