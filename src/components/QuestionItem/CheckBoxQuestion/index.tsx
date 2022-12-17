import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

import "./CheckBoxQuestion.scss"

type CheckBoxQuestionChoicePropsType = {
    idx : number
}

const CheckBoxQuestionChoice = ({ idx } : CheckBoxQuestionChoicePropsType) => {
    return (
        <div className="checkbox-question-choice-wrapper">
            <label htmlFor={`choice-${idx}`} className="checkbox-question-label">
                <CheckBoxOutlineBlankRoundedIcon className="checkbox-question-mark"/>    
            </label>
            {/* <RadioButtonUncheckedIcon className="checkbox-question-mark"/> */}
            <input className="checkbox-question-input" type="text" id={`choice-${idx}`} defaultValue={`옵션 ${idx}`}/>
            <CloseRoundedIcon className="choice-delete-icon"/>
        </div>
    )
}

const CheckBoxQuestion = () => {
    return (
        <div className="checkbox-question-wrapper">
            <CheckBoxQuestionChoice idx={1}/>
            <CheckBoxQuestionChoice idx={2}/>
            <div className="checkbox-add-indicator">
                <CheckBoxOutlineBlankRoundedIcon className="choice-add-icon"/>    
                <div className="choice-add-div">
                    <span id="add-option">옵션 추가</span>&nbsp;
                    <span>또는</span>&nbsp;
                    <span id="add-others">'기타' 추가</span>
                </div>
            </div>
        </div>
    )
}

export default CheckBoxQuestion;