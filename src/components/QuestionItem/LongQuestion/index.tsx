import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { HOME, PREVIEW } from "../../../constants";
import { RootState } from "../../../store/slices";
import { updateAnswer } from "../../../store/slices/questionnaireSlice";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../../types";
import "./LongQuestion.scss";

type LongQuestionPropsType = {
    questionnaire : Questionnaire,
    questionData : QuestionItemType | ExplanationItemType,
}

const LongQuestion = ({ questionnaire, questionData } : LongQuestionPropsType) => {
    const dispatch = useDispatch();
    const onUpdateAnswer = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateAnswer({ id : questionData.id, value : target.value }));
    }
    return (
        <div className="long-question-wrapper">
            <input 
                type="text" 
                className={ questionnaire.viewPage !== PREVIEW ? "long-question-input-readonly" : "long-question-input" }  
                onChange={onUpdateAnswer}
                value={ questionnaire.viewPage !== HOME ? ((questionData as QuestionItemType).answer as string) : "장문형 텍스트"}
                readOnly={ questionnaire.viewPage !== PREVIEW}
                placeholder="장문형 텍스트"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateAnswer : (id : number, value : string) => dispatch(updateAnswer({id, value})),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LongQuestion);