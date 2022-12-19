import { connect } from "react-redux";
import { Dispatch } from "redux";
import { HOME } from "../../../constants";
import { RootState } from "../../../store/slices";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../../types";
import "./ShortQuestion.scss";

type ShortQuestionPropsType = {
    questionnaire : Questionnaire
    questionData : QuestionItemType | ExplanationItemType,
}

const ShortQuestion = ({ questionnaire, questionData } : ShortQuestionPropsType) => {
    return (
        <div className="short-question-wrapper">
            <input 
                type="text" 
                className={ questionnaire.viewPage === HOME ? "short-question-input-readonly" : "short-question-input" } 
                placeholder="단답형 텍스트"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShortQuestion);