import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./QuestionItemFooter.scss";
import React, { useEffect } from 'react';
import { ExplanationItemType, QuestionItemType } from '../../types';
import { Dispatch } from 'redux';
import { RootState } from '../../store/slices';
import { copyQuestion, deleteQuestion, toggleRequired } from '../../store/slices/questionnaireSlice';
import { connect, useDispatch } from 'react-redux';

type QuestionItemFooterPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const QuestionItemFooter = ({ questionData } : QuestionItemFooterPropsType) => {
    const dispatch = useDispatch();
    const onToggleRequired = (e : React.SyntheticEvent) => {
        dispatch(toggleRequired({id : questionData.id}));
    }
    const copyQuestionItem = (e : React.MouseEvent) => {
        dispatch(copyQuestion({id : questionData.id}));
    }
    const deleteQuestionItem = (e : React.MouseEvent) => {
        dispatch(deleteQuestion({id : questionData.id}))
    }

    return (
        <div className="question-item-footer">
            <div id="question-control-icon-wrapper">
                <div className="footer-icon-wrapper" onClick={copyQuestionItem}>
                    <ContentCopyIcon className="footer-icon"/>
                </div>
                <div className="footer-icon-wrapper" onClick={deleteQuestionItem}>
                    <DeleteSweepRoundedIcon className="footer-icon"/>
                </div>
            </div>
            <FormControlLabel 
                control={<Switch />} 
                onChange={onToggleRequired}
                checked={questionData.isRequired}
                label="필수"
                labelPlacement='start' 
            />
            <MoreVertIcon id="footer-option-icon" className="footer-icon"/>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        copyQuesiton : (id : number) => dispatch(copyQuestion(id)),
        deleteQuestion : (id : number) => dispatch(deleteQuestion(id)), 
        toggleRequired : (id : number) => dispatch(toggleRequired(id)), 
        
    }
}

const mapstateToProps = (state : RootState) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(QuestionItemFooter);