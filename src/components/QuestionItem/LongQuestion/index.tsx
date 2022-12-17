import { ExplanationItemType, QuestionItemType } from "../../../types";
import "./LongQuestion.scss";

type LongQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const LongQuestion = ({ questionData } : LongQuestionPropsType) => {
    return (
        <div className="long-question-wrapper">
            <input type="text" className="long-question-input" placeholder="장문형 텍스트"/>
        </div>
    )
}

export default LongQuestion;