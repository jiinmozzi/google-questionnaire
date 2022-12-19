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
                        return <ExplanationItem questionData={question}/>;
                    case SHORT:
                        return <QuestionItem children={ <ShortQuestion questionData={question} /> }/>
                    case LONG:
                        return <QuestionItem children={ <LongQuestion questionData={question}/> }/>
                    case MULTIPLE:
                        return <QuestionItem children={ <MultipleQuestion questionData={question} /> }/>
                    case CHECKBOX:
                        return <QuestionItem children={ <CheckBoxQuestion questionData={question} /> }/>
                    case DROPDOWN:
                        return <QuestionItem children={ <DropDownQuestion questionData={question} /> }/>
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