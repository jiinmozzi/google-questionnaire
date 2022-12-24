import QuestionTypeDropDown from "../QuestionTypeDropDown";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import "./QuestionItemHeader.scss";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { connect, useDispatch } from "react-redux";
import { updateQuestionText } from "../../store/slices/questionnaireSlice";
import { HOME, LONG, SHORT } from "../../constants";
type QuestionItemHeaderPropsType = {
    questionnaire : Questionnaire
    questionData : QuestionItemType | ExplanationItemType,
}

const QuestionItemHeader = ({ questionData, questionnaire } : QuestionItemHeaderPropsType ) => {
    const dispatch = useDispatch();
    const [countOfLines, setCountOfLines] = useState<number>(1);

    const onUpdateQuestionText = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateQuestionText({id : questionData.id, value : target.value}));
    }

    const onChangeTextArea = (e : React.ChangeEvent) => {
        const target = e.target as HTMLTextAreaElement;
        const text = target.value;
        const lines = text.split(/\r|\r\n|\n/).length;
        setCountOfLines(lines);
        dispatch(updateQuestionText({id : questionData.id, value : text}));
    }
    
    const onFocusTextArea = (e : React.FocusEvent) => {
        const target = e.target as HTMLTextAreaElement;
        const text = target.value;
        const lines = text.split(/\r|\r\n|\n/).length;
        setCountOfLines(lines);
    }

    return (
        <div className="question-item-header-wrapper">
            <div className="question-title-wrapper">
                { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && questionData.type === SHORT ? 
                    <input
                        type="text"
                        className="question-title-input"
                        placeholder="질문"
                        onChange={onUpdateQuestionText}
                        defaultValue={(questionData as QuestionItemType).question}
                    /> 
                : questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId ? 
                    
                    <textarea
                        style={{ height : `${countOfLines * 24 + 32}px`}}
                        onChange={onChangeTextArea}
                        onFocus={onFocusTextArea}
                        className="question-title-textarea"
                        defaultValue={ (questionData as QuestionItemType).question }
                    >
                    </textarea>
                :
                    <div className="unfocused-item-title"> 
                        {(questionData as QuestionItemType).question.split(/\r|\r\n|\n/).map((line : string, idx : number) => {
                            return <div>{line}{ idx===0 && <span className="asterisk">{ questionData.isRequired && " *"}</span> }</div>
                            }
                        )}
                        
                    </div>
                }
            </div>
            { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId && 
                <>
                    <InsertPhotoOutlinedIcon className="photo-disabled"/>
                    <QuestionTypeDropDown questionData={questionData}/>
                </>
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateQuestionText : (id : number, value : string) => dispatch(updateQuestionText({id, value})),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionItemHeader);