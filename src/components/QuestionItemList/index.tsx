import "./QuestionItemList.scss";
import { connect, useDispatch } from "react-redux";
import { RootState } from "../../store/slices";
import { Dispatch } from "redux";
import { ExplanationItemType, QuestionItemType, Questionnaire } from "../../types";
import ShortQuestion from "../QuestionItem/ShortQuestion";
import LongQuestion from "../QuestionItem/LongQuestion";
import MultipleQuestion from "../QuestionItem/MultipleQuestion";
import CheckBoxQuestion from "../QuestionItem/CheckBoxQuestion";
import DropDownQuestion from "../QuestionItem/DropDownQuestion";
import { createInitialQuestion, updateItemOrder } from "../../store/slices/questionnaireSlice";
import QuestionItem from "../QuestionItem";
import { CHECKBOX, DROPDOWN, EXPLANATION, LONG, MULTIPLE, SHORT } from "../../constants";
import ExplanationItem from "../ExplanationItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

type QuestionnaireItemListType = {
    questionnaire : Questionnaire
}

const QuestionItemList = ({ questionnaire } : QuestionnaireItemListType) => {
    const dispatch = useDispatch();
    const onDragEnd = (result : DropResult) => {
        const {source, destination} = result;
        if (!destination ) return;
        dispatch(updateItemOrder({ draggedIndex : source.index, draggedOverIndex : destination.index}))
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questionItem">
                {(provided) => (
                <div id="question-item-list-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                    {questionnaire.questions.map((question : QuestionItemType | ExplanationItemType, idx : number) => {
                        switch(question.type){
                            case EXPLANATION:
                                return <ExplanationItem key={question.id} idx={idx} questionData={question}/>;
                            case SHORT:
                                return <QuestionItem key={question.id} idx={idx} children={ <ShortQuestion questionData={question} />}/>
                            case LONG:
                                return <QuestionItem key={question.id} idx={idx} children={ <LongQuestion questionData={question}/> }/>
                            case MULTIPLE:
                                return <QuestionItem key={question.id} idx={idx} children={ <MultipleQuestion questionData={question} /> }/>
                            case CHECKBOX:
                                return <QuestionItem key={question.id} idx={idx} children={ <CheckBoxQuestion questionData={question} /> }/>
                            case DROPDOWN:
                                return <QuestionItem key={question.id} idx={idx} children={ <DropDownQuestion questionData={question} /> }/>
                        }
                        return null;
                    })}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        createInititalQuestion : () => dispatch(createInitialQuestion()),
        updateItemOrder : (draggedIndex : number, draggedOverIndex : number) => dispatch(updateItemOrder({draggedIndex, draggedOverIndex})),
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionItemList);

function updataDragAndDrop(arg0: { draggedIndex: any; draggedOverIndex: any; }): any {
    throw new Error("Function not implemented.");
}
