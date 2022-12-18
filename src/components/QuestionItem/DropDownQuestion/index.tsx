import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../store/slices';
import { addOption, deleteOption } from '../../../store/slices/questionnaireSlice';

import { ExplanationItemType, QuestionItemType } from '../../../types';
import "./DropDownQuestion.scss";

type DropDownQuestionChoicePropsType = {
    idx : number,
    id : number,
}

type DropDownQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const DropDownQuestionChoice = ({idx, id} : DropDownQuestionChoicePropsType) => {
    const dispatch = useDispatch();

    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }
    return (
        <div className="dropdown-question-choice-wrapper">
            <label htmlFor={`choice-${idx}`} className="dropdown-question-label">
                {idx}
            </label>
            <input className="dropdown-question-input" type="text" id={`dropdown-${idx}`} defaultValue={idx}/>
            { idx > 0 && <CloseRoundedIcon className="choice-delete-icon" onClick={onDeleteOption}/>}
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
            {((questionData as QuestionItemType).options as string[]).map((option : string, idx : number) => {
                return <DropDownQuestionChoice idx={idx} id={questionData.id}/>    
            })}
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
        deleteOption : (idx : number, id : number) => dispatch(deleteOption({idx, id})),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownQuestion);