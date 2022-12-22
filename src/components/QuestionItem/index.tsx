import QuestionItemHeader from "../QuestionItemHeader";
import QuestionItemFooter from "../QuestionItemFooter";
import "./QuestionItem.scss";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { updateFocus } from "../../store/slices/questionnaireSlice";
import { connect, useDispatch } from "react-redux";
import { HOME } from "../../constants";
import { Draggable } from "react-beautiful-dnd";

import DragHandleIcon from '@mui/icons-material/DragHandle';

type QuestionItemPropsType = {
    children : ReactNode,
    questionnaire : Questionnaire
    idx : number,
}

const QuestionItem = ({ questionnaire, children, idx } : QuestionItemPropsType) => {
    const dispatch = useDispatch();
    const [questionData, setQuestionData] = useState<QuestionItemType>({
        type : "long",
        question : "",
        isRequired : false,
        options : [],
        answer : "",
        id : Date.now(),
    });
    
    useEffect(() => {
        if ( !React.isValidElement(children) ) return;
        setQuestionData(children.props.questionData);
    }, [children]) 
    
    const onUpdateFocus = (e : React.FocusEvent) => {
        dispatch(updateFocus({id : questionData.id}));
    }
    const onClickUpdateFocus = ( e : React.MouseEvent ) => {
        dispatch(updateFocus({id : questionData.id}));
    }
    return (
        questionnaire.viewPage === HOME ? 
        <Draggable draggableId={String(questionData.id)} index={idx}>
            {(provided) => (
                <form {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="question-item-wrapper" onFocus={onUpdateFocus} onMouseDown={onClickUpdateFocus}>
                    { questionnaire.viewPage === HOME && questionnaire.focusedId === questionData.id && 
                        <>
                            <div className="question-item-drag-icon"><DragHandleIcon /></div>
                            <div className="question-item-focused"></div>
                        </>
                    }
                    <div className="question-item-content">
                        <QuestionItemHeader questionData={ questionData }/>
                        {children}
                        { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && <QuestionItemFooter questionData={ questionData }/>}
                    </div>
                </form>
            )}
        </Draggable>
        : (
            <form className="question-item-wrapper" onFocus={onUpdateFocus} onMouseDown={onClickUpdateFocus}>
                    <div className="question-item-content">
                        <QuestionItemHeader questionData={ questionData }/>
                        {children}
                    </div>
                </form>
        )
    )
}

const mapDisptachToProps = (dispatch : Dispatch) => {
    return {
        updateFocus : ( id : number ) => dispatch(updateFocus(id)),
    }
}

const mapStateToProps = (state : RootState) => {
    return {
        questionnaire : state.questionnaireState,
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(QuestionItem);