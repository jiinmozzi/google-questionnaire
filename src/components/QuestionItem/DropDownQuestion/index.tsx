import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { addOption, addOtherOption, deleteOption, updateAnswer, updateOption, updateOptionOrder } from '../../../store/slices/questionnaireSlice';
import { SelectChangeEvent } from '@mui/material/Select';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { EMPTY, HOME, PREVIEW } from '../../../constants';
import { RootState } from '../../../store/slices';
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
    answer : number,
    id : number,
    options : string[],
    questionnaire : Questionnaire,
}

// DropDown on Home page
const DropDownQuestionChoice = ({ questionnaire, idx, id, options } : DropDownQuestionChoicePropsType) => {
    const dispatch = useDispatch();
    const [showDragIcon, setShowDragIcon] = useState<boolean>(false);
    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }
    const onUpdateOption = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateOption({ idx, id, value : target.value }));
    }

    return (
        <Draggable key={idx} draggableId={String(idx)} index={idx}>
            {(provided) => (
            <div className="dropdown-question-choice-wrapper" {...provided.draggableProps} ref={provided.innerRef} onMouseOver={() => setShowDragIcon(true)} onMouseLeave={() => setShowDragIcon(false)}>
                <div className="choice-drag-icon" style={{ display : showDragIcon && questionnaire.viewPage === HOME ? "" : "none"}} {...provided.dragHandleProps}><DragIndicatorIcon /></div>
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
                    value={ options[idx] || ""}
                    placeholder={`?????? ${idx+1}`}
                />
                { questionnaire.viewPage === HOME && idx > 0 && questionnaire.focusedId === id && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
            </div>
            )}
        </Draggable>
    )
}

// DropDown on PREVIEW Page and RESPONSE Page
const DropDownSelector = ({ questionnaire, id, options, answer } : DropDownSelectorPropsType) => {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState<string>("??????");

    const onUpdateAnswer = (e : SelectChangeEvent) => {
        if ( questionnaire.viewPage === PREVIEW ){
            setSelectedValue(e.target.value);
            dispatch(updateAnswer({ id , value : options.indexOf(e.target.value) }));
        }
    }   
    useEffect(() => {
        if (answer < 0) setSelectedValue("??????");
    }, [answer])

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          onChange={onUpdateAnswer}
          value={options[answer] || "??????"}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          readOnly={ questionnaire.viewPage !== PREVIEW }
        >
          <MenuItem disabled value="??????">
            <em>??????</em>
          </MenuItem>
          {options.map((option : string, idx : number) => {
            return <MenuItem id={String(idx)} value={option} key={idx}>{option}</MenuItem>
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
    
    const onDragEnd = (result : DropResult) => {
        const {source, destination} = result;
        if (!destination) return;
        dispatch(updateOptionOrder({ draggedIndex : source.index , draggedOverIndex : destination.index , id : questionData.id }));
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dropdownQuestion">
                {(provided) => (
                    <div className="dropdown-question-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                        { questionnaire.viewPage !== HOME && <DropDownSelector answer={(questionData as QuestionItemType).answer as number} id={questionData.id} options={((questionData as QuestionItemType).options as string[])} questionnaire={questionnaire}/> }

                        { questionnaire.viewPage === HOME && ((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                            return <DropDownQuestionChoice 
                                        key={idx} 
                                        questionnaire={questionnaire} 
                                        idx={idx} id={questionData.id} 
                                        options={ ((questionData as QuestionItemType).options) as string[] }
                                    />
                        })}
                        {provided.placeholder} 
                        { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && 
                            <div className="dropdown-add-indicator">
                                <label 
                                    htmlFor={`dropdown-${((questionData as QuestionItemType).options as string[]).length}`} 
                                    className="dropdown-question-label">
                                    {((questionData as QuestionItemType).options as string[]).length + 1}
                                </label>
                                <div className="dropdown-add-div">
                                    <span id="add-option" onClick={onAddOption}>?????? ??????</span>&nbsp;
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
        updateAnswer : (id : number, value : number) => dispatch(updateAnswer({id, value})),
        updateOptionOrder : (draggedIndex : number, draggedOverIndex : number, id : number) => dispatch(updateOptionOrder({ draggedIndex, draggedOverIndex, id })),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownQuestion);