import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import "./MultipleQuestion.scss";
import { ExplanationItemType, QuestionItemType, Questionnaire } from '../../../types';
import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/slices';
import { addOption, addOtherOption, deleteOption, updateAnswer, updateOption, updateOptionOrder } from '../../../store/slices/questionnaireSlice';
import { HOME, PREVIEW } from '../../../constants';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useNavigate } from 'react-router-dom';

type MultipleQuestionChoicePropsType = {
    questionnaire : Questionnaire,
    id : number,
    idx : number,
    option : string,
    options : string[],
    answer : number,
}

type MultipleQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
    questionnaire : Questionnaire,
}

const MultipleQuestionChoice = ( { questionnaire, idx, id, option, options, answer} : MultipleQuestionChoicePropsType ) => {
    const dispatch = useDispatch();
    const [showDragIcon, setShowDragIcon] = useState<boolean>(false);
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
        <Draggable key={idx} draggableId={String(idx)} index={idx}>
            {(provided) => (
            <div className="multiple-question-choice-wrapper" {...provided.draggableProps} ref={provided.innerRef} onClick={onUpdateAnswer} onMouseOver={() => setShowDragIcon(true)} onMouseLeave={() => setShowDragIcon(false)}>
                <div className="choice-drag-icon" style={{ display : showDragIcon && questionnaire.viewPage === HOME ? "" : "none"}} {...provided.dragHandleProps}><DragIndicatorIcon /></div>
                <label htmlFor={`multiple-${idx}`} className="multiple-question-label">
                    { (answer !== idx || questionnaire.viewPage === HOME) ? <RadioButtonUncheckedIcon className="multiple-question-mark"/> : <RadioButtonCheckedRoundedIcon className="multiple-question-mark"/>}
                </label>
                {/* <RadioButtonUncheckedIcon className="multiple-question-mark"/> */}
                <input 
                    className={ questionnaire.viewPage !== HOME ? "multiple-question-input multiple-question-input-readonly" : questionnaire.focusedId === id ? "multiple-question-input" : "multiple-question-input multiple-unfocused"}
                    type="text" 
                    onChange={onUpdateOption}
                    readOnly = { questionnaire.viewPage !== HOME || option === '기타...' }
                    value={ options[idx] || ""}
                    id={`multiple-${idx}`} 
                    placeholder={`옵션 ${idx+1}`}
                    />
                { questionnaire.viewPage === HOME && idx > 0 && questionnaire.focusedId === id && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
            </div>
            )}
        </Draggable>
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

    const onDragEnd = (result : DropResult) => {
        const {source, destination} = result;
        if (!destination) return;
        dispatch(updateOptionOrder({ draggedIndex : source.index , draggedOverIndex : destination.index , id : questionData.id }));
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="multipleOption">
                {(provided) => (
                    <div className="multiple-question-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                        { ((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                            return <MultipleQuestionChoice 
                                        answer={(questionData as QuestionItemType).answer as number} 
                                        questionnaire={questionnaire} 
                                        id={questionData.id} 
                                        key={idx}
                                        idx={idx} 
                                        options={ (questionData as QuestionItemType).options as string[] }
                                        option={ option }
                                    />    
                        })}
                        {provided.placeholder} 
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
                )}
            </Droppable>
        </DragDropContext> 
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        addOption : (id : number) => dispatch(addOption(id)),
        addOtherOption : (id : number) => dispatch(addOtherOption(id)),
        deleteOption : (idx : number, id : number) => dispatch(deleteOption({idx, id})),
        updateOption : (idx : number, id : number, value : string) => dispatch(updateOption({idx, id, value})),
        updateAnswer : (id : number, value : number) => dispatch(updateOption({id, value})),
        updateOptionOrder : (draggedIndex : number, draggedOverIndex : number, id : number) => dispatch(updateOptionOrder({ draggedIndex, draggedOverIndex, id })),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleQuestion);
