import { ExplanationItemType, QuestionItemType } from "../../types";
import "./ExplanationItem.scss";

type ExplanationItemPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const ExplanationItem = ({ questionData } : ExplanationItemPropsType) => {
    return (
        <div className="explanation-item-wrapper">

        </div>
    )
}

export default ExplanationItem