import QuestionTypeDropDown from "../QuestionTypeDropDown";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import "./QuestionItemHeader.scss";
import React, { useEffect, useState } from "react";
import { ExplanationItemType, QuestionItemType } from "../../types";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { connect, useDispatch } from "react-redux";
import { updateQuestionText } from "../../store/slices/questionnaireSlice";

type QuestionItemHeaderPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const QuestionItemHeader = ({ questionData } : QuestionItemHeaderPropsType ) => {
    const dispatch = useDispatch();
    const [focused, setFocused] = useState<boolean>(false); 
    const onUpdateQuestionText = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateQuestionText({id : questionData.id, value : target.value}));
    }
    
    return (
        <div className="question-item-header-wrapper">
            <div className="question-title-wrapper">
                <input 
                    type="text" 
                    className="question-title-input" 
                    placeholder="질문" 
                    onFocus={() => setFocused(true)} 
                    onBlur={() => setFocused(false)}
                    onChange={onUpdateQuestionText}
                    value={ (questionData as QuestionItemType).question }
                    
                    />
            </div>
            <InsertPhotoOutlinedIcon className="photo-disabled"/>
            <QuestionTypeDropDown questionData={questionData}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateQuestionText : (id : number, value : string) => dispatch(updateQuestionText({id, value})),
        // createQuestion : () => dispatch(createQuestion),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionItemHeader);