import QuestionTypeDropDown from "../QuestionTypeDropDown";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import "./QuestionItemHeader.scss";
import { useEffect, useState } from "react";
import { ExplanationItemType, QuestionItemType } from "../../types";

type QuestionItemHeaderPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const QuestionItemHeader = ({ questionData } : QuestionItemHeaderPropsType ) => {
    const [focused, setFocused] = useState<boolean>(false); 
    return (
        <div className="question-item-header-wrapper">
            <div className="question-title-wrapper">
                <input 
                    type="text" 
                    className="question-title-input" 
                    placeholder="질문" 
                    onFocus={() => setFocused(true)} 
                    onBlur={() => setFocused(false)}
                    value={ (questionData as QuestionItemType).question }
                    />
            </div>
            <InsertPhotoOutlinedIcon className="photo-disabled"/>
            <QuestionTypeDropDown questionData={questionData}/>
        </div>
    )
}

export default QuestionItemHeader;