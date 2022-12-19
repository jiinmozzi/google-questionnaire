import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PREVIEW } from "../../constants";
import { RootState } from "../../store/slices";
import { resetQuesionnaireAnswers, updateViewPage } from "../../store/slices/questionnaireSlice";
import { useNavigate } from "react-router-dom";
import "./Preview.scss";
import Header from "../../components/Header";
import QuestionItemList from "../../components/QuestionItemList";
const Preview = ({ questionnaire } : any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(updateViewPage({ page : PREVIEW }));
    }, [dispatch])

    return (
        <div id="preview-wrapper">
            <form id="preview-form" onSubmit={() => navigate('/response')}>
                <Header />
                <QuestionItemList />
                <div id="preview-controller">
                    <button id="preview-submit-btn" type="submit">제출</button>
                    <span id="preview-reset" onClick={() => dispatch(resetQuesionnaireAnswers())}>양식 지우기</span>
                </div>
            </form>
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