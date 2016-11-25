/**
 * Created by Kevin on 2016/11/16.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class SaveQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      src:"",
      output:"",
      mode:"brush",
      showForm:false,
      type:1,
      grade:3,
      level:1,
      important:3,
      remark:""
    };
    const {image,ui} = this.props;
    this.me = 2;
    this.isPaint = false;
    this.width = ui.width;
    this.height = Math.round(ui.width*image.crop.height/image.crop.width);
  }
  beautiful(){
    const {image} = this.props;
    let img = document.createElement("canvas");
    img.width = image.crop.width;
    img.height = image.crop.height;
    var ctx = img.getContext('2d');
    let m = [0, 0, 0, 0, this.me, 0, 0, 0, 0];
    var output = this.ConvolutionMatrix(this.dataSource, m, 1,-150);
    ctx.putImageData(output,0,0);
    let data = img.toDataURL("image/jpg");
    this.setState({src:data});
  }
  componentWillMount(){
    const {image,ui} = this.props;
    let img = new Image();
    img.onload = ()=>{
      let canvas = document.createElement('canvas');
      canvas.width = image.crop.width;
      canvas.height = image.crop.height;
      let context = canvas.getContext('2d');
      context.drawImage(img,image.crop.x,image.crop.y,image.crop.width,image.crop.height,0,0,image.crop.width,image.crop.height);
      this.dataSource = context.getImageData(0,0,image.crop.width,image.crop.height);

      this.props.takePhoto(false);
      this.props.takePhotoSource("");
      this.props.changeTitle("编辑错题");
      this.beautiful();
    };
    img.src = ui.photo;
  }
  _mousedown(lastPointerPosition){
    this.isPaint = true;
    this.context.beginPath();
    this.context.moveTo(lastPointerPosition.x,lastPointerPosition.y);
  }
  _mouseup(){
    this.isPaint = false;
  }
  _mousemove(lastPointerPosition){
    if (this.state.mode == 'brush') {
      this.context.globalCompositeOperation = 'source-over';
    }
    if (this.state.mode == 'eraser') {
      this.context.globalCompositeOperation = 'destination-out';
    }
    this.context.lineTo(lastPointerPosition.x, lastPointerPosition.y);
    this.context.stroke();
  }
  componentDidMount() {
    /*let stage = this.refs.stage.getStage();
    let img = this.refs.image;
    let layer = this.refs.layer;*/
    let stage = this.refs.stage;
    this.canvas = document.createElement("canvas");
    stage.appendChild(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = "#FFFFFF";
    this.context.lineJoin = "round";
    this.context.lineWidth = 10;

    stage.addEventListener('mousedown', (event) => {
      event.preventDefault();
      let lastPointerPosition = {
        x: event.offsetX,
        y: event.offsetY
      }
      this._mousedown(lastPointerPosition);
    });
    stage.addEventListener('touchstart', (event) => {
      event.preventDefault();
      let lastPointerPosition = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY - 96
      };
      this._mousedown(lastPointerPosition);
    });
    stage.addEventListener('mouseup', () => {
      event.preventDefault();
      this._mouseup()
    });
    stage.addEventListener('touchend', () => {
      event.preventDefault();
      this._mouseup()
    });
    stage.addEventListener('mousemove', (event) => {
      event.preventDefault();
      if(!this.isPaint){
        return;
      }
      let lastPointerPosition = {
        x: event.offsetX,
        y: event.offsetY
      };
      this._mousemove(lastPointerPosition);
    });
    stage.addEventListener('touchmove', (event) => {
      event.preventDefault();
      if(!this.isPaint){
        return;
      }
      let lastPointerPosition = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY -96
      };
      this._mousemove(lastPointerPosition);
    });
  }
  save(){
    let output = this.canvas.toDataURL("image/png");
    this.setState({output:output});
    this.setState({showForm:false});
    this.props.saveQuestion({
      "type":      this.state.type,
      "grade":     this.state.grade,
      "level":     this.state.level,
      "q":         this.state.src,
      "a":         output,
      "time":      new Date().getTime(),
      "times":     0,
      "important": this.state.important,
      "remark":    this.state.remark
    },(data)=>{console.log(data)})
  }
  ConvolutionMatrix(input, m, divisor, offset){
    var output = document.createElement("canvas").getContext('2d').createImageData(input);
    var w = input.width, h = input.height;
    var iD = input.data, oD = output.data;
    for (var y = 1; y < h-1; y += 1) {
      for (var x = 1; x < w-1; x += 1) {
        for (var c = 0; c < 3; c += 1) {
          var i = (y*w + x)*4 + c;
          oD[i] = offset
            +(m[0]*iD[i-w*4-4] + m[1]*iD[i-w*4] + m[2]*iD[i-w*4+4]
            + m[3]*iD[i-4]     + m[4]*iD[i]     + m[5]*iD[i+4]
            + m[6]*iD[i+w*4-4] + m[7]*iD[i+w*4] + m[8]*iD[i+w*4+4])
            / divisor;
        }
        oD[(y*w + x)*4 + 3] = 255;
      }
    }
    return output;
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
  _getImportant(){
    const _important = this.props.ui._important;
    let r = [];
    _important.map((item)=>{
      if(this.state.important == item.data)
        r.push(<li key={item.data} className="active" onClick={()=>this.setState({important:item.data})}>{item.name}</li>);
      else
        r.push(<li key={item.data} onClick={()=>this.setState({important:item.data})}>{item.name}</li>)
    });
    return r;
  }
  render() {
    const {ui} = this.props;
    return (
      <div className="paintContainer main">
        <div className='toolBar'>
          <span
            style={{backgroundImage:this.state.mode=='brush'?"url(" + require('../assets/img/draw_active.png') + ")":"url(" + require('../assets/img/draw.png') + ")"}}
            onClick={()=>{
            this.setState({mode : 'brush'});
            }}> </span>
          <span
            style={{backgroundImage:this.state.mode=='eraser'?"url(" + require('../assets/img/undo_active.png') + ")":"url(" + require('../assets/img/undo.png') + ")"}}
            onClick={()=>{
              this.setState({mode : 'eraser'});
            }}> </span>
          <span
            className="reduce"
            onClick={()=>{
              this.me = this.me - 0.1;
              this.beautiful();
            }}> </span>
          <span
            className="add"
            onClick={()=>{
              this.me = this.me + 0.1;
              this.beautiful();
            }}> </span>
          <span className="preSaveBtn" onClick={()=>this.setState({showForm:true})}> </span>
        </div>
        <img src={this.state.src} style={{width:this.width,height:this.height}}/>
        <div className='paint'
             ref="stage"
             style={{width:this.width,height:this.height}}>
        </div>
        <ReactCSSTransitionGroup transitionName="mask"
                                 transitionEnterTimeout={100}
                                 transitionLeaveTimeout={100}>
        {this.state.showForm?
        <div className="mask" style={{height:ui.height - 48}}></div>:null}
        {this.state.showForm?
        <div className="seletion" style={{width:ui.width - 20}}>
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
            <div>难度</div>
            <ul>
              {this._getImportant()}
            </ul>
          </section>
          <section>
            <div>备注</div>
            <input type="text" value={this.state.remark} onChange={(event)=>this.setState({remark:event.target.value})}></input>
          </section>
          <div className='saveBtn' onClick={()=>this.save()}>保 存</div>
        </div>
          :null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default SaveQuestion
