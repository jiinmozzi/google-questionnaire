import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';

import "./CheckBoxQuestion.scss"
import { ExplanationItemType, QuestionItemType } from '../../../types';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../../store/slices';
import { Dispatch } from 'redux';
import { addOption } from '../../../store/slices/questionnaireSlice';

type CheckBoxQuestionChoicePropsType = {
    idx : number
}

type CheckBoxQuestionPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const CheckBoxQuestionChoice = ({ idx } : CheckBoxQuestionChoicePropsType) => {
    return (
        <div className="checkbox-question-choice-wrapper">
            <label htmlFor={`choice-${idx}`} className="checkbox-question-label">
                <CheckBoxOutlineBlankRoundedIcon className="checkbox-question-mark"/>    
            </label>
            {/* <RadioButtonUncheckedIcon className="checkbox-question-mark"/> */}
            <input className="checkbox-question-input" type="text" id={`choice-${idx}`} defaultValue={`옵션 ${idx}`}/>
            <CloseRoundedIcon className="choice-delete-icon"/>
        </div>
    )
}

const CheckBoxQuestion = ({ questionData } : CheckBoxQuestionPropsType ) => {
    const dispatch = useDispatch();
    const onAddOption = (e : React.MouseEvent) => {
        dispatch(addOption({ id : questionData.id }));
    }
    return (
        <div className="checkbox-question-wrapper">
            {((questionData as QuestionItemType).options as string[]).map((option : string) => {
                return <CheckBoxQuestionChoice idx={1}/>    
            })}
            <CheckBoxQuestionChoice idx={1}/>
            <CheckBoxQuestionChoice idx={2}/>
            <div className="checkbox-add-indicator">
                <CheckBoxOutlineBlankRoundedIcon className="choice-add-icon"/>    
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxQuestion);
