import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { CHECKBOX, EMPTY, PREVIEW } from "../../constants";
import { RootState } from "../../store/slices";
import { resetQuesionnaireAnswers, updateViewPage } from "../../store/slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";
import "./Preview.scss";
import Header from "../../components/Header";
import QuestionItemList from "../../components/QuestionItemList";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import { Alert } from "@mui/material";

type PreviewPropsType = {
    questionnaire : Questionnaire
}

const Preview = ({ questionnaire } : PreviewPropsType) => {
    const [needsComplement, setNeedsComplement] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(updateViewPage({ page : PREVIEW }));
    }, [dispatch])
    useEffect(() => {
        if (needsComplement){
            const timer = setTimeout(() => {
                setNeedsComplement(false)
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [needsComplement])
    const onSubmitPreview = (e : React.MouseEvent) => {
        const questions = questionnaire.questions;
        const mandatoryQuestions = questions.filter((question : QuestionItemType | ExplanationItemType) => question.isRequired === true) as QuestionItemType[];
        for (let i=0; i<mandatoryQuestions.length; i++){
            const item = mandatoryQuestions[i];
            if ( (item.type === CHECKBOX && (item.answer as number[]).length === 0) || item.answer === "" || item.answer === EMPTY){
                setNeedsComplement(true);
                return;
            }
        }
        navigate('/response');
    }
    
    return (
        <div id="preview-wrapper">
            { needsComplement && <Alert className="complement-alert" severity="warning">필수 항목들을 채워주십시오</Alert> }
            <div id="preview-form">
                <Header />
                <QuestionItemList />
                <div id="preview-controller">
                    <div role="button" id="preview-submit-btn" onClick={onSubmitPreview}>제출</div>
                    <span id="preview-reset" onClick={() => dispatch(resetQuesionnaireAnswers())}>양식 지우기</span>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateViewPage : (page : string) => dispatch(updateViewPage(page)),
        resetQuestionnaireAnswers : () => dispatch(resetQuesionnaireAnswers),
    }
}

const mapstateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Preview);