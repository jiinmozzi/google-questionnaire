import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatClearIcon from '@mui/icons-material/FormatClear';

import "./FontStyleSelector.scss";
import React from 'react';

const FontStyleSelector = () => {
    return (
        <div className="font-style-selector-wrapper">
            <FormatBoldIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            <FormatUnderlinedIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            <FormatItalicIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
            <InsertLinkIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()} />
            <FormatClearIcon className="font-style-select-icon" onMouseDown={(e : React.MouseEvent) => e.preventDefault()}/>
        </div>
    )
}

export default FontStyleSelector;