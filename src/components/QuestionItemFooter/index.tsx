import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./QuestionItemFooter.scss";
import React from 'react';

const QuestionItemFooter = () => {
    const onChange = (e : React.SyntheticEvent) => {
        console.log(e);
    }
    return (
        <div className="question-item-footer">
            <div id="question-control-icon-wrapper">
                <div className="footer-icon-wrapper">
                    <ContentCopyIcon className="footer-icon"/>
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

export default QuestionItemFooter;