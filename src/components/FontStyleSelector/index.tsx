import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatClearIcon from '@mui/icons-material/FormatClear';

import "./FontStyleSelector.scss";
import React from 'react';

const FontStyleSelector = () => {
    return (
        <div className="font-style-selector-wrapper" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}>
            <div className="font-icon-wrapper">
                <FormatBoldIcon className="font-style-select-icon" />
            </div>
            <div className="font-icon-wrapper">
                <FormatUnderlinedIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            </div>
            <div className="font-icon-wrapper">
                <FormatItalicIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            </div>
            <div className="font-icon-wrapper">
                <InsertLinkIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()} />
            </div>
            <div className="font-icon-wrapper">
                <FormatClearIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            </div>
            
        </div>
    )
}

export default FontStyleSelector;