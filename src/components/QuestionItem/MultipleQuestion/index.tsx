import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./MultipleQuestion.scss";
import { ExplanationItemType, QuestionItemType, Questionnaire } from '../../../types';
import React from 'react';
import { Dispatch } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/slices';
import { addOption, addOtherOption, deleteOption, updateAnswer, updateOption } from '../../../store/slices/questionnaireSlice';
import { HOME, PREVIEW } from '../../../constants';

type MultipleQuestionChoicePropsType = {
    questionnaire : Questionnaire,
    id : number,
    idx : number,
    options : string[],
    answer : number,
}

type MultipleQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
    questionnaire : Questionnaire,
}

const MultipleQuestionChoice = ( {questionnaire, idx, id, options, answer} : MultipleQuestionChoicePropsType ) => {
    const dispatch = useDispatch();
    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }

    const onUpdateOption = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateOption({ idx, id, value : target.value }));
    }

    const onUpdateAnswer = (e : React.MouseEvent ) => {
        if (questionnaire.viewPage === PREVIEW) dispatch(updateAnswer({ id, value : idx}))
    }
    return (
        <div className="multiple-question-choice-wrapper" onClick={onUpdateAnswer}>
            <label htmlFor={`multiple-${idx}`} className="multiple-question-label">
                { (answer !== idx || questionnaire.viewPage === HOME) ? <RadioButtonUncheckedIcon className="multiple-question-mark"/> : <RadioButtonCheckedRoundedIcon className="multiple-question-mark"/>}
            </label>
            {/* <RadioButtonUncheckedIcon className="multiple-question-mark"/> */}
            <input 
                className={ questionnaire.viewPage !== HOME ? "multiple-question-input multiple-question-input-readonly" : questionnaire.focusedId === id ? "multiple-question-input" : "multiple-question-input multiple-unfocused"}
                type="text" 
                onChange={onUpdateOption}
                readOnly = { questionnaire.viewPage !== HOME || options[idx] === '기타...' }
                defaultValue={ options[idx] }
                id={`multiple-${idx}`} 
                placeholder={`옵션 ${idx+1}`}
                />
            { questionnaire.viewPage === HOME && idx > 0 && questionnaire.focusedId === id && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
        </div>
    )
}

const MultipleQuestion = ({ questionnaire, questionData } : MultipleQuestionPropsType) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }
    const onAddOtherOption = ( e : React.MouseEvent ) => {
        dispatch(addOtherOption({ id : questionData.id }));
    }   
    return (
        <div className="multiple-question-wrapper">
            {((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                return <MultipleQuestionChoice key={idx} answer={(questionData as QuestionItemType).answer as number} questionnaire={questionnaire} id={questionData.id} idx={idx} options={ ((questionData as QuestionItemType).options) as string[] }/>    
            })}
            { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && 
            <div className="choice-add-indicator">
                <RadioButtonUncheckedIcon className="choice-add-icon"/>    
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
        updateAnswer : (id : number, value : number) => dispatch(updateOption({id, value}))
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleQuestion);
