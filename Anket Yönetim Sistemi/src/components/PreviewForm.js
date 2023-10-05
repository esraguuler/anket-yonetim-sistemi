import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

StylesManager.applyTheme("defaultV2");

function PreviewForm({title, description, setCreateForm}) {
    const formElements = useSelector(state => state.formElements)
    const [surveyJson, setSurveyJson] = useState({})

    useEffect(() => {
        setSurveyJson({
            title,
            description,
            elements: formElements
        })
        setCreateForm(false)
    }, [title, description, formElements])

    const survey = new Model(surveyJson);
    return <Survey model={survey} />;
}

export default PreviewForm;
