/**
 * Created by Kevin on 2016/11/21.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import LogList from '../components/LogList';
export const LogListPage = (props) => {
  return (
    <LogList
      changeTitle = {props.actions.changeTitle}
      logs = {props.actions.logs}
      ui={props.ui}
      image={props.image}
    />
  );
};

LogListPage.propTypes = {
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
)(LogListPage);
