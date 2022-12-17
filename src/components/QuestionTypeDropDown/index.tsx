import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import "./QuestionTypeDropDown.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const QuestionTypeDropDown = () => {
  const [questionType, setQuestionType] = React.useState<string>("");
  const handleChange = (e : SelectChangeEvent<string>) => {
    switch (e.target.value){
      case "short":
        setQuestionType(`✏️ 단답형`);
        break;
      case "long":
        setQuestionType("✏️ 장문형");
        break;
      case "multiple":
        setQuestionType("🎲 객관식 질문");
        break;
      case "checkbox":
        setQuestionType("📍 체크박스");
        break;
      case "dropdown":
        setQuestionType("📁 드롭다운");
        break;
    }
  }

  // useEffet(() => {}, [])
  return (
    <div className="question-type-dropdown-wrapper">
      <FormControl className="quesiton-type-form" sx={{  width: 240 }}>
        <Select
          className="quesiton-type-select"
          variant='standard'
          displayEmpty
          value={questionType}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>🙋‍♀️ 질문 형식</em>;
            }
            return selected;
          }}
          
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>질문 형식</em>
          </MenuItem>
            <MenuItem value="short" className="dropdown-menu">
                <ShortTextIcon className="question-type-icon" style={{ fill : "rgb(95,99,103)"}}/>
                <span className="icon-text">단답형</span>
            </MenuItem>
            <MenuItem className="dropdown-menu" value="long" style={{borderBottom : "1px solid rgba(95,99,103, 0.3)"}}>
                <SubjectIcon className="question-type-icon" style={{ fill : "rgb(95,99,103)"}}/>
                <span className="icon-text">장문형</span>
            </MenuItem>
            <MenuItem className="dropdown-menu" value="multiple">
                <CheckCircleIcon className="question-type-icon" style={{ fill : "rgb(95,99,103)"}}/>
                <span className="icon-text">객관식 질문</span>
            </MenuItem>
            <MenuItem className="dropdown-menu" value="checkbox">
               <CheckBoxIcon className="question-type-icon" style={{ fill : "rgb(95,99,103)"}}/>
               <span className="icon-text">체크박스</span>
            </MenuItem>
            <MenuItem className="dropdown-menu" value="dropdown">
                <ArrowDropDownCircleIcon className="question-type-icon" style={{ fill : "rgb(95,99,103)"}}/>
                <span className="icon-text">드롭다운</span>
            </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
export default QuestionTypeDropDown;