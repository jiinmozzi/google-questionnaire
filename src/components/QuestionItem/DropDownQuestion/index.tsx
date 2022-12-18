import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../store/slices';
import { addOption } from '../../../store/slices/questionnaireSlice';

import { ExplanationItemType, QuestionItemType } from '../../../types';
import "./DropDownQuestion.scss";

type DropDownQuestionChoicePropsType = {
    idx : number,
}

type DropDownQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const DropDownQuestionChoice = ({idx} : DropDownQuestionChoicePropsType) => {
    return (
        <div className="dropdown-question-choice-wrapper">
            <label htmlFor={`choice-${idx}`} className="dropdown-question-label">
                {idx}
            </label>
            <input className="dropdown-question-input" type="text" id={`dropdown-${idx}`} defaultValue={idx}/>
            <CloseRoundedIcon className="choice-delete-icon"/>
        </div>
    )
}

const DropDownQuestion = ({questionData} : DropDownQuestionPropsType) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }
    return (
        <div className="dropdown-question-wrapper">
            {((questionData as QuestionItemType).options as string[]).map((option : string) => {
                return <DropDownQuestionChoice idx={1}/>    
            })}
            <DropDownQuestionChoice idx={1}/>
            <DropDownQuestionChoice idx={2}/>
            <div className="dropdown-add-indicator">
                <div className="choice-add-div">
                    <span id="add-option" onClick={onAddOption}>옵션 추가</span>&nbsp;
                    <span>또는</span>&nbsp;
                    <span id="add-others">'기타' 추가</span>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        addOption : (id : number) => dispatch(addOption(id)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownQuestion);