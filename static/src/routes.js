import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage.js';
import AddQuestionPage from  './containers/AddQuestionPage';
import SaveQuestionPage from  './containers/SaveQuestionPage';
import GetQuestionPage from  './containers/GetQuestionPage';
import QuestionPreviewPage from './containers/QuestionPreviewPage';
import LogListPage from './containers/LogListPage';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="getQuestion" component={GetQuestionPage}/>
    <Route path="addQuestion" component={AddQuestionPage}/>
    <Route path="logListPage" component={LogListPage}/>
    <Route path="saveQuestion" component={SaveQuestionPage}/>
    <Route path="questionPreview/:id" component={QuestionPreviewPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
