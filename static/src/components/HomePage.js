import React,{ PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
class HomePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      type:1
    };
    this.pageIndex = 1;
    this.pageSize = 10;
  }
  _list(){
    let l = [];
    if(this.props.image.currentList) {
      this.props.image.currentList.map((item) => {
        l.push(<div className="questionItem" key={item._id}>
          <img className="Q" src={item.q} width="100%" height="auto"/>
          <img className="A" src={item.a} width="100%" height="auto"/>
        </div>);
      });
    }else{
      if(l.length == 0){
        l.push(<div className="questionItem">无数据</div>)
      }
      return l;
    }
    if(l.length == 0){
      l.push(<div className="questionItem">数据加载中...</div>)
    }
    return l;
  }
  _getList(type){
    this.props.actions.getQuestionForType(type,this.pageIndex,this.pageSize)
  }
  _getType(){
    const _types = this.props.ui._types;
    this.pageIndex = 1;
    this.pageSize = 10;
    let r = [];
    _types.map((item)=>{
      if(this.state.type == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this._changeTab(item)}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this._changeTab(item)}>{item.name}</li>)
    });
    return r;
  }
  _changeTab(item){
    this.setState({type:item.data})
    this._getList(item.data)
  }
  componentWillMount(){
    this._getList(this.state.type);
  }
  render() {
    return (
      <div className="main">
        <div className="seletionHome" style={{width:this.props.ui.width}}>
          <section>
            <ul>
              {this._getType()}
            </ul>
          </section>
        </div>
        {this._list()}
      </div>
    );
  }
}

HomePage.propTypes = {
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
)(HomePage);

