import QuestionItemHeader from "../QuestionItemHeader";
import QuestionItemFooter from "../QuestionItemFooter";

import "./QuestionItem.scss";
import { ReactNode } from "react";

type QuestionItemPropsType = {
    children : ReactNode,
}

const QuestionItem = ({ children } : QuestionItemPropsType) => {
    return (
        <div className="question-item-wrapper">
            <div className="question-item-focused"></div>
            <div className="question-item-content">
                <QuestionItemHeader />
                    {children}
                <QuestionItemFooter />
            </div>
        </div>
    )
}

export default QuestionItem;