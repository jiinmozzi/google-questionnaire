import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import "./Response.scss";

const Response = () => {
    return (
        <div id="response-wrapper"></div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {

    }
}

const mapstateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Response);