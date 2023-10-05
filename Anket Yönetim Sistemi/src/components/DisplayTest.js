import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

import surveyJson from '../questions'

StylesManager.applyTheme("defaultV2");

function App() {
  const survey = new Model(surveyJson);
  return <Survey model={survey} />;
}

export default App;
