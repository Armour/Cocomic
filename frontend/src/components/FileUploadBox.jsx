import React from 'react';

let fileInput;
let imagePreview = [];

const addButtonOnClick = () => {
  fileInput.click();
};

const setInput = (node) => {
  fileInput = node;
};

export class FileUploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.addButtonOnClick = addButtonOnClick.bind(this);
    this.setInput = setInput.bind(this);
    this.state = {
      file: '',
      imagePreviewUrl: '',
    };
    this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>);
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.file !== this.state.file && prevState.imagePreviewUrl !== this.state.imagePreviewUrl) {
      imagePreview.push({
        file: prevState.file,
        imageURL: prevState.imagePreviewUrl,
      });
    }
  }

  handlePicChange(e) {
    e.preventDefault();
    imagePreview = [];
    this.placeHolder = null;
    for (let i = 0; i < e.target.files.length; i += 1) {
      const reader = new FileReader();
      let fileObject;

      reader.onloadend = () => {
        this.setState({
          file: fileObject,
          imagePreviewUrl: reader.result,
        });
      };
      fileObject = e.target.files[i];
      reader.readAsDataURL(fileObject);
    }
  }

  render() {
    if (imagePreview === []) {
      this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>);
    }
    return (
      <div className="upload-box-wrapper">
        <div className="row">
          <div className="col s12">
            <div className="card z-depth-5">
              <div className="card-content">
                <span className="card-title center-align"> New Chapter </span>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="description" type="text" className="validate" />
                    <label htmlFor="description">Description</label>
                  </div>
                </div>
                <div className="col s3"><a id="add_pic_button" role="button" tabIndex={0} className="btn-floating btn-large waves-effect waves-light" onClick={this.addButtonOnClick} onKeyDown={this.addButtonOnClick}><i className="material-icons">file_upload</i></a></div>
                {this.placeHolder}
                {imagePreview.map((image, index) => (
                  <div className="col s3"><img id={index} src={image.imageURL} alt="placeholder" height="200" width="200" /></div>
                ))}
                <div className="row">
                  <div className="col s12">
                    <a id="upload_btn" className="waves-effect waves-light btn">upload</a>
                  </div>
                </div>
                <input id="upload_input" type="file" multiple ref={this.setInput} onChange={(e) => { this.handlePicChange(e); }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
