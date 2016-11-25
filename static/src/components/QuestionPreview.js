/**
 * Created by Kevin on 2016/11/13.
 */
import React from 'react';
class QuestionPreview extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      questions:[]
    };
  }
  componentWillMount(){
    this.props.changeTitle("题目预览");
    this.props.logQuestions({ID:this.props.params.id},(data)=>{
      this.setState({questions:data})
    })
  }
  _list(){
    let l = [];
    if(this.state.questions && this.state.questions.length>0) {
      this.state.questions.map((item) => {
        l.push(<div className="questionItem" key={item._id}>
          <img className="Q" src={item.q} width="100%" height="auto"/>
        </div>);
      });
    }else{
      l.push(<div style={{textAlign:"center"}}>Loading...</div>);
    }
    return l;
  }
  render() {
    return (
      <div className="main">
        <div>{this._list()}</div>
      </div>
    );
  }
}

export default QuestionPreview
