import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../store/slices';
import { addOption, deleteOption, updateOption } from '../../../store/slices/questionnaireSlice';

import { ExplanationItemType, QuestionItemType } from '../../../types';
import "./DropDownQuestion.scss";

type DropDownQuestionChoicePropsType = {
    idx : number,
    id : number,
    options : string[],
}

type DropDownQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const DropDownQuestionChoice = ({idx, id, options} : DropDownQuestionChoicePropsType) => {
    const dispatch = useDispatch();

    const onDeleteOption = (e : React.MouseEvent) => {
        dispatch(deleteOption({idx, id}));
    }

    const onUpdateOption = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateOption({ idx, id, value : target.value }));
    }

    return (
        <div className="dropdown-question-choice-wrapper">
            <label 
                htmlFor={`choice-${idx}`} 
                className="dropdown-question-label">
                {idx + 1}
            </label>
            <input 
                className="dropdown-question-input" 
                type="text" 
                id={`dropdown-${idx}`} 
                onChange={onUpdateOption}
                value={ options[idx] }
                placeholder={`옵션 ${idx+1}`}
            />
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
                return <DropDownQuestionChoice idx={idx} id={questionData.id} options={ ((questionData as QuestionItemType).options) as string[] }/>
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
        updateOption : (idx : number, id : number, value : string) => dispatch(updateOption({idx, id, value}))
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDownQuestion);