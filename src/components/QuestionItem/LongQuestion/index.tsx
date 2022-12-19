import { connect } from "react-redux";
import { Dispatch } from "redux";
import { HOME } from "../../../constants";
import { RootState } from "../../../store/slices";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../../types";
import "./LongQuestion.scss";

type LongQuestionPropsType = {
    questionnaire : Questionnaire,
    questionData : QuestionItemType | ExplanationItemType,
}

const LongQuestion = ({ questionnaire, questionData } : LongQuestionPropsType) => {
    return (
        <div className="long-question-wrapper">
            <input type="text" className={ questionnaire.viewPage === HOME ? "long-question-input-readonly" : "long-question-input" }  placeholder="장문형 텍스트"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LongQuestion);