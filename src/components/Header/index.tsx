import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { updateHeaderExplanation, updateHeaderTitle } from "../../store/slices/questionnaireSlice";
import { Questionnaire } from "../../types";
import FontStyleSelector from "../FontStyleSelector";
import "./Header.scss";

type HeaderPropsType = {
    questionnaire : Questionnaire
}

const Header = ({ questionnaire } : HeaderPropsType) => {
    const dispatch = useDispatch();
    const [titleFocused, setTitleFocused] = useState<boolean>(false);
    
    const onUpdateHeaderTitle = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateHeaderTitle({ value : target.value }))
    }

    const onUpdateHeaderExplanation = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateHeaderExplanation({ value : target.value}))
    }

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
                        onChange={onUpdateHeaderTitle}
                        placeholder="제목 없는 설문지"
                        type="text" 
                        defaultValue="제목 없는 설문지"
                    />
                    {titleFocused && <FontStyleSelector />}
                    <input 
                        className="header-input" 
                        id="header-explanation" 
                        type="text" 
                        onChange={onUpdateHeaderExplanation}
                        placeholder="설문지 설명" />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateHeaderTitle : (value : string) => dispatch(updateHeaderTitle(value)),
        updateHeaderExplanation : (value : string) => dispatch(updateHeaderExplanation(value)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);