import "./QuestionItemList.scss";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/slices";
import { Dispatch } from "redux";
import { useEffect } from "react";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import ShortQuestion from "../QuestionItem/ShortQuestion";
import LongQuestion from "../QuestionItem/LongQuestion";
import MultipleQuestion from "../QuestionItem/MultipleQuestion";
import CheckBoxQuestion from "../QuestionItem/CheckBoxQuestion";
import DropDownQuestion from "../QuestionItem/DropDownQuestion";
import { createInitialQuestion } from "../../store/slices/questionnaireSlice";
import QuestionItem from "../QuestionItem";
import { CHECKBOX, DROPDOWN, EXPLANATION, LONG, MULTIPLE, SHORT } from "../../constants";
import ExplanationItem from "../ExplanationItem";

type QuestionnaireItemListType = {
    questionnaire : Questionnaire
}

const QuestionItemList = ({ questionnaire } : QuestionnaireItemListType) => {
    return (
        <div id="question-item-list-wrapper">
            {questionnaire.questions.map((question : QuestionItemType | ExplanationItemType) => {
                
                switch(question.type){
                    case EXPLANATION:
                        return <ExplanationItem key={question.id} questionData={question}/>;
                    case SHORT:
                        return <QuestionItem key={question.id} children={ <ShortQuestion questionData={question} /> }/>
                    case LONG:
                        return <QuestionItem key={question.id} children={ <LongQuestion questionData={question}/> }/>
                    case MULTIPLE:
                        return <QuestionItem key={question.id} children={ <MultipleQuestion questionData={question} /> }/>
                    case CHECKBOX:
                        return <QuestionItem key={question.id} children={ <CheckBoxQuestion questionData={question} /> }/>
                    case DROPDOWN:
                        return <QuestionItem key={question.id} children={ <DropDownQuestion questionData={question} /> }/>
                }
                return null;
                
            })}
            
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        createInititalQuestion : () => dispatch(createInitialQuestion()),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionItemList);