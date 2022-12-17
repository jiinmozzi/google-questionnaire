import { ExplanationItemType, QuestionItemType } from "../../../types";
import "./ShortQuestion.scss";

type ShortQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const ShortQuestion = ({ questionData } : ShortQuestionPropsType) => {
    return (
        <div className="short-question-wrapper">
            <input type="text" className="short-question-input" placeholder="단답형 텍스트"/>
        </div>
    )
}

export default ShortQuestion;