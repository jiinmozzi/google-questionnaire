import React from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { copyQuestion, deleteQuestion, updateExplanationContent, updateExplanationTitle, updateFocus } from "../../store/slices/questionnaireSlice";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./ExplanationItem.scss";
import { HOME } from "../../constants";
import { Draggable } from "react-beautiful-dnd";

import DragHandleIcon from '@mui/icons-material/DragHandle';

type ExplanationItemPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
    questionnaire : Questionnaire
    idx : number,
}

const ExplanationItem = ({ questionnaire, questionData, idx } : ExplanationItemPropsType) => {
    const dispatch = useDispatch();
    const onUpdateExplanationTitle = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateExplanationTitle({ value : target.value, id : questionData.id }))
    }

    const onUpdateExplanationContent = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateExplanationContent({ value : target.value, id : questionData.id }));
    }

    const onUpdateFocus = ( e : React.FocusEvent ) => {
        dispatch(updateFocus({id : questionData.id}));
    }

    const onClickUpdateFocus = ( e : React.MouseEvent ) => {
        dispatch(updateFocus({id : questionData.id}));
    }
    
    const oncopyQuestion = ( e : React.MouseEvent ) => {
        dispatch(copyQuestion({id : questionData.id}));
    }

    const onDeleteQuestion = ( e : React.MouseEvent ) => {
        dispatch(deleteQuestion({id : questionData.id}))
    }
    return (
        <Draggable draggableId={String(questionData.id)} index={idx}>
            {(provided) => (
            <form className="explanation-item-wrapper" onFocus={onUpdateFocus} onMouseDown={onClickUpdateFocus} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                { questionnaire.viewPage === HOME && questionnaire.focusedId === questionData.id &&  <div id="explanation-item-focused"></div>}
                { questionnaire.viewPage === HOME && <div className="explanation-item-drag-icon"><DragHandleIcon /></div>}
                <div id="explanation-item-content">
                    <div className="explanation-item-input-wrapper">
                        <input 
                            className={questionnaire.viewPage === HOME ? "explanation-item-input" : "explanation-item-input explanation-item-input-readonly"}
                            id="explanation-item-title" 
                            readOnly={questionnaire.viewPage !== HOME}
                            onChange={onUpdateExplanationTitle}
                            value={ (questionData as ExplanationItemType).title }
                            placeholder="?????? ?????? ?????????"
                            type="text" 
                        />
                        { questionnaire.viewPage === HOME && 
                        <div id="explanation-item-input-icons-wrapper">
                            <div className="explanation-item-input-icon" onClick={oncopyQuestion}>
                                <ContentCopyIcon className="explanation-item-input-icons"/>
                            </div>
                            <div className="explanation-item-input-icon" onClick={onDeleteQuestion}>
                                <DeleteSweepRoundedIcon className="explanation-item-input-icons"/>
                            </div>
                            <div className="explanation-item-input-icon" id="deactivated-icon">
                                <MoreVertIcon className="explanation-item-input-icons"/>
                            </div>
                        </div>
                        }
                    </div>
                    
                    
                    
                    <div className="explanation-item-input-wrapper">
                        <input 
                            className={questionnaire.viewPage === HOME ? "explanation-item-input" : "explanation-item-input explanation-item-input-readonly"}
                            id="explanation-item-explanation" 
                            type="text" 
                            onChange={onUpdateExplanationContent}
                            readOnly={questionnaire.viewPage !== HOME}
                            value={(questionData as ExplanationItemType).explanation}
                            placeholder="?????? ????????????" 
                        />
                    </div>
                </div>
            </form>
            )}
        </Draggable>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateExplanationTitle : (value : string, id : number) => dispatch(updateExplanationTitle({value, id})),
        updateExplanationContent : (value : string, id : number) => dispatch(updateExplanationContent({value, id})),
        updateFocus : (id : number) => dispatch(updateFocus(id)),
        copyQuestion : (id : number) => dispatch(copyQuestion(id)),
        deleteQuestion : (id : number) => dispatch(deleteQuestion(id)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplanationItem);