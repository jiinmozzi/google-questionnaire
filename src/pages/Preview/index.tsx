import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PREVIEW } from "../../constants";
import { RootState } from "../../store/slices";
import { updateViewPage } from "../../store/slices/questionnaireSlice";
import "./Preview.scss";
import Header from "../../components/Header";
import QuestionItemList from "../../components/QuestionItemList";
const Preview = ({ questionnaire } : any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateViewPage({ page : PREVIEW }));
    }, [dispatch])

    return (
        <div id="preview-wrapper">
            <Header />
            <QuestionItemList />
        </div>
    )
}


const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateViewPage : (page : string) => dispatch(updateViewPage(page)),
    }
}

const mapstateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Preview);