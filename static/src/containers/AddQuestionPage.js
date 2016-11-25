/**
 * Created by Kevin on 2016/11/15.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import AddQuestion from '../components/AddQuestion';

export const AddQuestionPage = (props) => {
  return (
    <AddQuestion
      takePhoto = {props.actions.takePhoto}
      changeTitle = {props.actions.changeTitle}
      takePhotoSource = {props.actions.takePhotoSource}
      takeCrop={props.actions.takeCrop}
      ui={props.ui}
      image={props.image}
    />
  );
};

AddQuestionPage.propTypes = {
  actions: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  image:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
    image: state.image
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestionPage);
