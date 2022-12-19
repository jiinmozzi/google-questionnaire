import "./Home.scss";
import Header from "../../components/Header";
import QuestionItemList from "../../components/QuestionItemList";
import SideBar from "../../components/SideBar";
import { useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { updateViewPage } from "../../store/slices/questionnaireSlice";
import { HOME } from "../../constants";
import { RootState } from "../../store/slices";
import { connect, useDispatch } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateViewPage({page : HOME}))
    }, [dispatch])
    return (
        <div id="home-wrapper">
            <Header />
            <QuestionItemList />
            <SideBar />
        </div>
    ) 
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateViewPage : (page : string) => dispatch(updateViewPage(page)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);