import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { BOLD, HEADER, HEADEREXPLANATION, HOME, ITALIC, PREVIEW, RESPONSE, UNDERLINE } from "../../constants";
import { RootState } from "../../store/slices";
import { updateFocus, updateHeaderExplanation, updateHeaderTitle } from "../../store/slices/questionnaireSlice";
import { Questionnaire } from "../../types";
import FontStyleSelector from "../FontStyleSelector";
import "./Header.scss";

type HeaderPropsType = {
    questionnaire : Questionnaire
}

const Header = ({ questionnaire } : HeaderPropsType) => {
    const dispatch = useDispatch();
    const [titleFocused, setTitleFocused] = useState<boolean>(false);
    const [explanationFocused, setExplanationFocused] = useState<boolean>(false);
    const onUpdateHeaderTitle = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateHeaderTitle({ value : target.value }))
    }

    const onUpdateHeaderExplanation = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateHeaderExplanation({ value : target.value}))
    }
    const onUpdateFocus = (e : React.FocusEvent) => {
        dispatch(updateFocus({ id : HEADER }));
    }

    const onClickUpdateFocus = ( e : React.MouseEvent ) => {
        dispatch(updateFocus({id : HEADER}));
    }

    return (
        <form id="header-wrapper" onFocus={onUpdateFocus} onMouseDown={onClickUpdateFocus}>
            <div id="header-belt"></div>
            { questionnaire.focusedId === HEADER && questionnaire.viewPage === HOME && <div id="header-focused"></div>}
            { questionnaire.focusedId === HEADER && questionnaire.viewPage === HOME && <div id="header-unfocused"></div>}
            
            <div id="header-content">
                <div id="header-input-wrapper">
                    <input 
                        className={ questionnaire.viewPage !== HOME ? "header-input header-readOnly" : questionnaire.focusedId === HEADER ? "header-focused header-input" : "header-unfocused header-input" }
                        style={{
                            fontStyle : questionnaire.header.titleStyles.indexOf(ITALIC) === -1 ? "" : "italic",
                            fontWeight : questionnaire.header.titleStyles.indexOf(BOLD) === -1 ? "" : "bold",
                            textDecoration : questionnaire.header.titleStyles.indexOf(UNDERLINE) === -1 ? "" : "underline",
                            textUnderlinePosition : questionnaire.header.titleStyles.indexOf(UNDERLINE) === -1 ? "" : "under",
                        }}
                        id="header-title" 
                        onBlur={() => setTitleFocused(false)} 
                        onFocus={() => setTitleFocused(true)}
                        readOnly={ questionnaire.viewPage === PREVIEW || questionnaire.viewPage === RESPONSE }
                        onChange={onUpdateHeaderTitle}
                        placeholder="제목 없는 설문지"
                        type="text" 
                        defaultValue={questionnaire.header.title}
                    />
                    {titleFocused && questionnaire.viewPage === HOME && <FontStyleSelector id={HEADER}/>}
                    <input 
                        className={ questionnaire.viewPage !== HOME ? "header-input header-readOnly" : questionnaire.focusedId === HEADER ? "header-focused header-input" : "header-unfocused header-input" }
                        style={{
                            fontStyle : questionnaire.header.explanationStyles.indexOf(ITALIC) === -1 ? "" : "italic",
                            fontWeight : questionnaire.header.explanationStyles.indexOf(BOLD) === -1 ? "" : "bold",
                            textDecoration : questionnaire.header.titleStyles.indexOf(UNDERLINE) === -1 ? "" : "underline",
                        }}
                        id="header-explanation" 
                        type="text"
                        onBlur={() => setExplanationFocused(false)} 
                        onFocus={() => setExplanationFocused(true)}
                        onChange={onUpdateHeaderExplanation}
                        defaultValue={questionnaire.header.explanation}
                        placeholder="설문지 설명" 
                    />
                    {explanationFocused && questionnaire.viewPage === HOME && <FontStyleSelector id={HEADEREXPLANATION}/>}
                    { questionnaire.viewPage !== HOME && <div id="necessary-indicator">필수 항목 *</div> }
                </div>
            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateHeaderTitle : (value : string) => dispatch(updateHeaderTitle(value)),
        updateHeaderExplanation : (value : string) => dispatch(updateHeaderExplanation(value)),
        updateFocus : (id : number) => dispatch(updateFocus(id)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);