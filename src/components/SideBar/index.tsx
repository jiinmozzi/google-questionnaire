import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import "./SideBar.scss";
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/slices';
import { connect, useDispatch } from 'react-redux';
import { createExplanation, createQuestion } from '../../store/slices/questionnaireSlice';
const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPreviewToolTip, setShowPreviewToolTip] = useState<boolean>(false);
    const [showCreateQuestionToolTip, setShowCreateQuestionToolTip] = useState<boolean>(false);
    const [showAddTitleToolTip, setShowAddTitleToolTip] = useState<boolean>(false);
    
    const onCreateQuestion = (e : React.MouseEvent) => {
        dispatch(createQuestion());
    }
    const onCreateExplanation = ( e : React.MouseEvent ) => {
        dispatch(createExplanation());
    }
    return (
        <div id="side-bar-wrapper">
            <div className="side-bar-icon-wrapper" 
                onClick={() => navigate('/preview')}
                onMouseOver={() => setShowPreviewToolTip(true)} 
                onMouseLeave={() => setShowPreviewToolTip(false)}
            >
                <VisibilityOutlinedIcon className="side-bar-icons" />
                { showPreviewToolTip && <span className="tooltip">미리보기</span> }
            </div>
            <div className="side-bar-icon-wrapper" 
                onMouseOver={() => setShowCreateQuestionToolTip(true)} 
                onMouseLeave={() => setShowCreateQuestionToolTip(false)}
                onClick={onCreateQuestion}
            >
                <AddCircleOutlineRoundedIcon className="side-bar-icons"/>
                { showCreateQuestionToolTip && <span className="tooltip">질문 추가</span> }
            </div>
            <div className="side-bar-deactivated-icon-wrapper">
                <DriveFileMoveOutlinedIcon className="deactivated-icons"/>
            </div>
            <div className="side-bar-icon-wrapper" 
                onMouseOver={() => setShowAddTitleToolTip(true)} 
                onMouseLeave={() => setShowAddTitleToolTip(false)}
                onClick={onCreateExplanation}
            >
                <TextFieldsOutlinedIcon className="side-bar-icons" />
                { showAddTitleToolTip && <span className="tooltip">제목 및 설명 추가</span> }
            </div>
            <div className="side-bar-deactivated-icon-wrapper">
                <InsertPhotoOutlinedIcon className="deactivated-icons" />
            </div>
            <div className="side-bar-deactivated-icon-wrapper">
                <SmartDisplayOutlinedIcon className="deactivated-icons" />
            </div>
            <div className="side-bar-deactivated-icon-wrapper">
                <AutoAwesomeMosaicIcon className="deactivated-icons" />
            </div>
            
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        createQuestion : () => dispatch(createQuestion),
        createExplanation : () => dispatch(createExplanation),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);