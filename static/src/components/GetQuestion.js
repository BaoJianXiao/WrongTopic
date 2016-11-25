/**
 * Created by Kevin on 2016/11/13.
 */
import React from 'react';
class GetQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      type:1,
      grade:3,
      level:1,
      rand:true,
      count:10,
      questions:[]
    };
  }
  _getType(){
    const _types = this.props.ui._types;
    let r = [];
    _types.map((item)=>{
      if(this.state.type == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this.setState({type:item.data})}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this.setState({type:item.data})}>{item.name}</li>)
    });
    return r;
  }
  _getGrade(){
    const _grade = this.props.ui._grade;
    let r = [];
    _grade.map((item)=>{
      if(this.state.grade == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this.setState({grade:item.data})}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this.setState({grade:item.data})}>{item.name}</li>)
    });
    return r;
  }
  _getLevel(){
    const _level = this.props.ui._level;
    let r = [];
    _level.map((item)=>{
      if(this.state.level == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this.setState({level:item.data})}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this.setState({level:item.data})}>{item.name}</li>)
    });
    return r;
  }
  _getRand(){
    const _rand = this.props.ui._rand;
    let r = [];
    _rand.map((item)=>{
      if(this.state.rand == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this.setState({rand:item.data})}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this.setState({rand:item.data})}>{item.name}</li>)
    });
    return r;
  }
  _getCount(){
    const _count = this.props.ui._count;
    let r = [];
    _count.map((item)=>{
      if(this.state.count == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this.setState({count:item.data})}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this.setState({count:item.data})}>{item.name}</li>)
    });
    return r;
  }
  save(){
    this.props.createLogQs({
      Question:{type:this.state.type,
      grade:this.state.grade,
      level:this.state.level},
      rand:this.state.rand,
      count:this.state.count
    },(success,data)=>{
      if(success){
        this.setState({questions:data});
        this.saveLog(data);
      }else{
        alert("题目提取失败")
      }
    });
  }
  saveLog(data){
    let ids = [];
    data.map((item)=>{
      ids.push(item._id);
    });
    this.props.createLogQuestion({
      type:this.state.type,
      grade:this.state.grade,
      level:this.state.level,
      qs:ids.join(","),
      score:0
    },(success)=>{
      if(success){
        //hashHistory.push('/questionPreview');
      }else{
        alert("题目提取失败")
      }
    });
  }
  componentWillMount(){
    this.props.changeTitle("提取错题");
  }
  _list(){
    let l = [];
    if(this.state.questions) {
      this.state.questions.map((item) => {
        l.push(<div className="questionItem" key={item._id}>
          <img className="Q" src={item.q} width="100%" height="auto"/>
          <img className="A" src={item.a} width="100%" height="auto"/>
        </div>);
      });
    }
    return l;
  }
  render() {
    const {ui} = this.props;
    return (
    <div>
      {
        this.state.questions.length > 0 ?
          <div>{this._list()}</div>
          :
          <div className="seletion get" style={{width: ui.width - 20}}>
          <section>
            <div>课程</div>
            <ul>
              {this._getType()}
            </ul>
          </section>
          <section>
            <div>年级</div>
            <ul>
              {this._getGrade()}
            </ul>
          </section>
          <section>
            <div>学期</div>
            <ul>
              {this._getLevel()}
            </ul>
          </section>
          <section>
            <div>是否随机</div>
            <ul>
              {this._getRand()}
            </ul>
          </section>
          <section>
            <div>数量</div>
            <ul>
              {this._getCount()}
            </ul>
          </section>
          <div className='saveBtn' onClick={() => this.save()}>提 取</div>
        </div>
      }
    </div>
    );
  }
}

export default GetQuestion
