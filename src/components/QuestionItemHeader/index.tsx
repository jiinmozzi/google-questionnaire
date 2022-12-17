import QuestionTypeDropDown from "../QuestionTypeDropDown";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import "./QuestionItemHeader.scss";
import { useState } from "react";

const QuestionItemHeader = () => {
    const [focused, setFocused] = useState<boolean>(false); 
    return (
        <div className="question-item-header-wrapper">
            <div className="question-title-wrapper">
                <input 
                    type="text" 
                    className="question-title-input" 
                    placeholder="질문" 
                    onFocus={() => setFocused(true)} 
                    onBlur={() => setFocused(false)}/>
                    
            </div>
            <InsertPhotoOutlinedIcon className="photo-disabled"/>
            <QuestionTypeDropDown />
        </div>
    )
}

export default QuestionItemHeader;