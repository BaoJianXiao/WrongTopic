/**
 * Created by Kevin on 2016/11/13.
 */
import React from 'react';
import ReactCrop from 'react-image-crop';
class AddQuestion extends React.Component{
  constructor(props) {
    super(props);
  }
  takePhoto(){
    this.props.takePhoto(true);
  }
  takePhotoSource(src){
    this.props.takePhotoSource(src);
  }
  imgPreview(fileDom){
    var MAX_WIDTH = 1024;
    var file = fileDom.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      var image = new Image();
      image.onload = ()=>{
        var canvas = document.createElement("canvas");
        if(image.width > MAX_WIDTH) {
            image.height *= MAX_WIDTH / image.width;
            image.width = MAX_WIDTH;
        }
        var ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var data = canvas.toDataURL("image/jpg");
        this.takePhotoSource(data);
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  componentWillMount(){
    this.props.changeTitle("添加错题");
  }
  render() {
    const {takeCrop} = this.props;
    return (
      <div className="main">
        {this.props.ui.photo?
        <ReactCrop src={this.props.ui.photo} onComplete={(crop, pixelCrop)=>{
          takeCrop(pixelCrop);
        }} />:
        <div className="photoPicker" onClick={()=>{
          this.refs.imgPicker.click();
          this.takePhoto();
        }
        }>点击拍摄照片</div>}
        <input ref="imgPicker" onChange={(event)=>this.imgPreview(event.target)} style={{display:"none"}} type="file" accept="image/*;capture=camera"/>
      </div>
    );
  }
}

export default AddQuestion
