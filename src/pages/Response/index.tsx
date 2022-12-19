import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Header from "../../components/Header";
import QuestionItemList from "../../components/QuestionItemList";
import { RESPONSE } from "../../constants";
import { RootState } from "../../store/slices";
import { updateViewPage } from "../../store/slices/questionnaireSlice";
import "./Response.scss";

const Response = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateViewPage({ page : RESPONSE }))
    }, [dispatch])
    return (
        <div id="response-wrapper">
            <Header />
            <QuestionItemList />
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateViewPage : ( page : string ) => dispatch(updateViewPage(page)),
    }
}

const mapstateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Response);