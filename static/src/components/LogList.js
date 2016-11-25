/**
 * Created by Kevin on 2016/11/13.
 */
import React from 'react';
import { hashHistory } from 'react-router';
var moment = require('moment');
class LogList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      logs:[]
    };
  }
  _typeInfo(data){
    let type = ""
    this.props.ui._types.map((item)=>{
      if(item.data == data.type){
        type = item.name;
      }
    })
    return `${type} ( ${data.qs.split(",").length} 题 ) `
  }
  _gradeInfo(data){
    let grade = "";
    let level = "";
    this.props.ui._grade.map((item)=>{
      if(item.data == data.grade){
        grade = item.name;
      }
    })
    this.props.ui._level.map((item)=>{
      if(item.data == data.level){
        level = item.name;
      }
    })
    return `${grade}年级 ${level}学期`
  }
  _list(){
    let l = [];
    this.state.logs.map((item)=>{
      l.push(<li onClick={()=>{
        hashHistory.push('/questionPreview/' + item._id);
      }}>
        <div className="time">{moment(item.time*1000).utcOffset(-8).format("YYYY-MM-DD hh:mm:ss")}</div>
        <div className="type">{this._typeInfo(item)}</div>
        <div className="info">{this._gradeInfo(item)}</div>
        </li>)
    })
    return l;
  }
  componentWillMount(){
    this.props.changeTitle("提取记录");
    this.props.logs({
      PageIndex:1,
      PageSize:20
    },(success,data)=>{
      if(success){
        this.setState({logs:data})
      }else{
        alert("获取记录失败")
      }
    })
  }
  render() {
    return (
      <div className="main">
        <ul className="logs">
        {this._list()}
        </ul>
      </div>
    );
  }
}

export default LogList
