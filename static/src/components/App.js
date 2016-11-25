import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { WindowResizeListener } from 'react-window-resize-listener';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import { hashHistory } from 'react-router';
class App extends React.Component {
  constructor(props,context) {
    super(props, context);
    this.state = {
      menu: false,
      frame:{}
    };
  }
  componentDidMount() {
  }
  _takeCrop(){
    if(this.props.ui.photo){
      hashHistory.push('/saveQuestion');
    }
  }
  _clear(){
    this.props.actions.takePhoto(false);
    this.props.actions.takePhotoSource("");
    this.props.actions.takeCrop("");
  }
  render() {
    return (
        <div className="wrapper">
          <WindowResizeListener onResize={windowSize => {
            this.setState({frame:{height:windowSize.windowHeight-48, width:windowSize.windowWidth}});
            this.props.actions.setFrame(windowSize.windowWidth,windowSize.windowHeight)
          }}/>
          <div className="sub-wrapper">
            <div className="titleNav">
              <span onClick={()=>{this.setState({menu:true})}} className="menu">&nbsp;</span>
              <span className="title">{this.props.ui.title}</span>
              {this.props.ui.isTakePhoto?
              <span>
                {this.props.image.crop?
                <span className="OK" onClick={()=>{
                  this._takeCrop();
                }}></span>:null}
                {this.props.ui.photo?
                <span className="cancle" onClick={()=>{
                  this._clear();
                }
                }></span>
                :
                <span>&nbsp;</span>}
            </span>:<span></span>}
            </div>
            <div className="container scroller" style={this.state.frame}>
              {this.props.children}
            </div>
            <ReactCSSTransitionGroup transitionName="mask"
                               transitionEnterTimeout={100}
                               transitionLeaveTimeout={100}>
              {this.state.menu?
                <div className="mask" onClick={()=>{this.setState({menu:false})}}>
                </div>:null}
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup transitionName="menu"
                               transitionEnterTimeout={100}
                               transitionLeaveTimeout={100}>
              {this.state.menu?
              <div className="leftNav">
                <span className="closeLeftMenu" onClick={()=>{this.setState({menu:false})}}></span>
                <ul>
                  <li><IndexLink to="/" onClick={()=>{this.setState({menu:false})}}>最近加入</IndexLink></li>
                  <li><IndexLink to="/getQuestion" onClick={()=>{this.setState({menu:false})}}>提取题目</IndexLink></li>
                  <li><IndexLink to="/logListPage" onClick={()=>{this.setState({menu:false})}}>最近提取</IndexLink></li>
                  <li><Link to="/addQuestion" onClick={()=>{this.setState({menu:false})}}>添加错题</Link></li>
                </ul>
              </div>:null}
            </ReactCSSTransitionGroup>
          </div>
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  ui: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    ui: state.ui,
    image:state.image
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
)(App);

