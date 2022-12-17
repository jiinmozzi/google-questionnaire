import React, { useState } from "react";
import FontStyleSelector from "../FontStyleSelector";
import "./Header.scss";

const Header = () => {
    const [titleFocused, setTitleFocused] = useState<boolean>(false);
    
    return (
        <div id="header-wrapper">
            <div id="header-belt"></div>
            <div id="header-focused">
            </div>
            <div id="header-content">
                <div id="header-input-wrapper">
                    <input 
                        className="header-input" 
                        id="header-title" 
                        onBlur={() => setTitleFocused(false)} 
                        onFocus={() => setTitleFocused(true)} 
                        
                        type="text" 
                        defaultValue="제목 없는 설문지"
                    />
                    {titleFocused && <FontStyleSelector />}
                    <input className="header-input" id="header-explanation" type="text" placeholder="설문지 설명" />
                </div>
            </div>
        </div>
    )
}

export default Header;