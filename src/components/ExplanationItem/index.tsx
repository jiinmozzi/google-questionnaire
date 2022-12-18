import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/slices";
import { updateExplanationContent, updateExplanationTitle } from "../../store/slices/questionnaireSlice";
import { ExplanationItemType, QuestionItemType } from "../../types";
import FontStyleSelector from "../FontStyleSelector";
import "./ExplanationItem.scss";

type ExplanationItemPropsType = {
    questionData : QuestionItemType | ExplanationItemType,
}

const ExplanationItem = ({ questionData } : ExplanationItemPropsType) => {
    const dispatch = useDispatch();
    const [titleFocused, setTitleFocused] = useState<boolean>(false);
    const [explanationFocused, setExplanationFocused] = useState<boolean>(false);
    const onUpdateExplanationTitle = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateExplanationTitle({ value : target.value, id : questionData.id }))
    }

    const onUpdateExplanationContent = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        dispatch(updateExplanationContent({ value : target.value, id : questionData.id }));
    }

    return (
        <div className="explanation-item-wrapper">
            <div id="explanation-item-focused">
            </div>
            <div id="explanation-item-content">
                <div id="explanation-item-input-wrapper">
                    <input 
                        className="explanation-item-input" 
                        id="explanation-item-title" 
                        onBlur={() => setTitleFocused(false)} 
                        onFocus={() => setTitleFocused(true)} 
                        onChange={onUpdateExplanationTitle}
                        placeholder="제목 없는 설문지"
                        type="text" 
                        defaultValue="제목 없는 설문지"
                    />
                    {titleFocused && <FontStyleSelector />}
                    <input 
                        className="explanation-item-input" 
                        id="explanation-item-explanation" 
                        type="text" 
                        onBlur={() => setExplanationFocused(false)} 
                        onFocus={() => setExplanationFocused(true)} 
                        onChange={onUpdateExplanationContent}
                        placeholder="설문지 설명" 
                    />
                    {explanationFocused && <FontStyleSelector />}
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        updateExplanationTitle : (value : string, id : number) => dispatch(updateExplanationTitle({value, id})),
        updateExplanationContent : (value : string, id : number) => dispatch(updateExplanationContent({value, id})),
        // updateHeaderTitle : (value : string) => dispatch(updateHeaderTitle(value)),
        // updateHeaderExplanation : (value : string) => dispatch(updateHeaderExplanation(value)),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplanationItem);