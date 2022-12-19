import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import "./Preview.scss";

const Preview = ({ questionnaire } : any) => {
    return (
        <div id="preview-wrapper"></div>
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

export default connect(mapstateToProps, mapDispatchToProps)(Preview);