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
import { copyQuestion } from '../../store/slices/questionnaireSlice';
import { connect, useDispatch } from 'react-redux';

type QuestionItemFooterPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const QuestionItemFooter = ({ questionData } : QuestionItemFooterPropsType) => {
    const dispatch = useDispatch();
    const onChange = (e : React.SyntheticEvent) => {
        
    }
    const onCopy = (e : React.MouseEvent) => {
        dispatch(copyQuestion({id : questionData.id}));
    }
    return (
        <div className="question-item-footer">
            <div id="question-control-icon-wrapper">
                <div className="footer-icon-wrapper">
                    <ContentCopyIcon className="footer-icon" onClick={onCopy}/>
                </div>
                <div className="footer-icon-wrapper">
                    <DeleteSweepRoundedIcon className="footer-icon"/>
                </div>
            </div>
            <FormControlLabel 
                control={<Switch />} 
                onChange={onChange}
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
    }
}

const mapstateToProps = (state : RootState) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(QuestionItemFooter);