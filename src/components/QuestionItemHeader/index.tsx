import QuestionTypeDropDown from "../QuestionTypeDropDown";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import "./QuestionItemHeader.scss";
import React, { useEffect, useState } from "react";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { connect, useDispatch } from "react-redux";
import { updateQuestionText } from "../../store/slices/questionnaireSlice";
import { HOME } from "../../constants";

type QuestionItemHeaderPropsType = {
    questionnaire : Questionnaire
    questionData : QuestionItemType | ExplanationItemType,
}

const QuestionItemHeader = ({ questionData, questionnaire } : QuestionItemHeaderPropsType ) => {
    const dispatch = useDispatch();
    const onUpdateQuestionText = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateQuestionText({id : questionData.id, value : target.value}));
    }

    return (
        <div className="question-item-header-wrapper">
            <div className="question-title-wrapper">
                { questionnaire.viewPage === HOME && questionData.id === questionnaire.focusedId ? 
                <input 
                    type="text"
                    className="question-title-input"
                    placeholder="질문"
                    onChange={onUpdateQuestionText}
                    defaultValue={(questionData as QuestionItemType).question}
                /> : 
                <div className="unfocused-item-title">{(questionData as QuestionItemType).question || "질문"} 
                    { questionData.isRequired && <span className="asterisk">{ questionData.isRequired && " *"}</span>}
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