import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import "./Navigation.scss";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/slices';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Questionnaire } from '../../types';
import { HOME, PREVIEW, RESPONSE } from '../../constants';

type NavigationPropsType = {
    questionnaire : Questionnaire
}
const Navigation = ({questionnaire} : NavigationPropsType) => {
    const navigate = useNavigate();
    return (
        <div className="navigation-wrapper">
            <Breadcrumbs aria-label="breadcrumb">
            { questionnaire.viewPage === HOME ? 
                <Typography color="text.primary">Home</Typography> :
                <Link underline="hover" color="inherit" onClick={() => navigate('/')}>
                    Home
                </Link>
            }
            { questionnaire.viewPage === PREVIEW ?
                <Typography color="text.primary">Preview</Typography> :
                <Link underline="hover" color="inherit" onClick={() => navigate('/preview')}>
                    Preview
                </Link>
            }
            { questionnaire.viewPage === RESPONSE ? 
                <Typography color="text.primary">Response</Typography> :
                <Link underline="hover" color="inherit" onClick={() => navigate('/response')}>
                    Response
                </Link>
            }

            </Breadcrumbs>
        </div>
    )
}

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        
    }
}

const mapStateToProps = ( state : RootState ) => {
    return {
        questionnaire : state.questionnaireState,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);