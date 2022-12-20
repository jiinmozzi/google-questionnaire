import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatClearIcon from '@mui/icons-material/FormatClear';

import "./FontStyleSelector.scss";
import React from 'react';
import { resetHeaderStyles, updateHeaderStyles } from '../../store/slices/questionnaireSlice';
import { connect, useDispatch } from 'react-redux';
import { BOLD, HEADER, HEADEREXPLANATION, ITALIC, RESET, UNDERLINE } from '../../constants';
import { Dispatch } from 'redux';
import { RootState } from '../../store/slices';
import { Questionnaire } from '../../types';

type FontStyleSelectorPropsType = {
    questionnaire : Questionnaire,
    id : number,
}

const FontStyleSelector = ({ questionnaire, id } : FontStyleSelectorPropsType) => {
    const dispatch = useDispatch();
    return (
        <div className="font-style-selector-wrapper" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}>
            <div className={`font-icon-wrapper 
                ${((id === HEADER && questionnaire.header.titleStyles.includes(BOLD)) || (id === HEADEREXPLANATION && questionnaire.header.explanationStyles.includes(BOLD)))  && "activated" }`} 
                onClick={() => dispatch(updateHeaderStyles({id, option : BOLD}))}
            >
                <FormatBoldIcon className="font-style-select-icon" />
            </div>
            <div className={`font-icon-wrapper 
                ${((id === HEADER && questionnaire.header.titleStyles.includes(UNDERLINE)) || (id === HEADEREXPLANATION && questionnaire.header.explanationStyles.includes(UNDERLINE)))  && "activated" }`} 
                onClick={() => dispatch(updateHeaderStyles({id, option : UNDERLINE}))}
            >
                <FormatUnderlinedIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            </div>
            <div className={`font-icon-wrapper 
                ${((id === HEADER && questionnaire.header.titleStyles.includes(ITALIC)) || (id === HEADEREXPLANATION && questionnaire.header.explanationStyles.includes(ITALIC)))  && "activated" }`} 
                onClick={() => dispatch(updateHeaderStyles({id, option : ITALIC}))}
            >
                <FormatItalicIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            </div>
            <div className="font-icon-wrapper"  onClick={() => dispatch(updateHeaderStyles({id, option : RESET}))}>
                <FormatClearIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()} onClick={() => dispatch(resetHeaderStyles({id}))}/>
            </div>
            
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateHeaderStyles : (id : number, option : string) => dispatch(updateHeaderStyles({id, option})),
        resetHeaderStyles : (id : number) => dispatch(resetHeaderStyles(id)),
    }
}

const mapStateToProps = (state : RootState) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FontStyleSelector);