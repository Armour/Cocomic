import React from 'react';
import PropTypes from 'prop-types';

let fileInput;
let discriptionInput;
let imagePreview = [];
let imageIdCounter = 0;

const addButtonOnClick = () => {
  fileInput.click();
};

const setInput = (node) => {
  fileInput = node;
};

const setDescriptionInput = (node) => {
  discriptionInput = node;
};

export class FileUploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.addButtonOnClick = addButtonOnClick.bind(this);
    this.setInput = setInput.bind(this);
    this.setDescriptionInput = setDescriptionInput.bind(this);
    this.uploadButtonOnClick = this.uploadButtonOnClick.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
    this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>);
  }

  handlePicChange(e) {
    e.preventDefault();
    this.placeHolder = null;
    for (let i = 0; i < e.target.files.length; i += 1) {
      const reader = new FileReader();
      let fileObject;
      let duplicateFlag = false;

      reader.onloadend = () => {
        imageIdCounter += 1;
        this.props.imageInsert({
          id: 'img'.concat(String(imageIdCounter)),
          file: fileObject,
          imagePreviewUrl: reader.result,
        });
      };
      fileObject = e.target.files[i];
      for (let j = 0; j < imagePreview.length; j += 1) {
        if (imagePreview[j].file.name === fileObject.name) duplicateFlag = true;
      }
      if (!duplicateFlag) reader.readAsDataURL(fileObject);
    }
  }

  uploadButtonOnClick(e) {
    e.preventDefault();
    this.props.imageUpload({
      images: imagePreview,
      description: discriptionInput.value,
    });
  }

  cancelButtonOnClick(e) {
    e.preventDefault();
    this.props.imageRemove(e.target.id);
  }

  render() {
    imagePreview = [];
    for (let i = 0; i < this.props.id.length; i += 1) {
      if (this.props.imagePreviewUrl[i]) {
        imagePreview.push({
          id: this.props.id[i],
          file: this.props.file[i],
          imageURL: this.props.imagePreviewUrl[i],
        });
      }
    }
    if (imagePreview.length % 4 === 0) {
      this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>);
    }
    return (
      <div className="upload-box-wrapper">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title center-align"> New Chapter </span>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="description" ref={this.setDescriptionInput} type="text" className="validate" />
                    <label htmlFor="description">Description</label>
                  </div>
                </div>
                {imagePreview.map((image, index) => (
                  <div key={image.id} className="col s3">
                    <img id={index} src={image.imageURL} alt="placeholder" height="200px" width="200px" />
                    <a id="cancel_pic_button" role="button" tabIndex={-2} className="btn-floating btn-tiny waves-effect waves-light" onClick={this.cancelButtonOnClick} onKeyDown={this.cancelButtonOnClick}><i id={image.id} className="material-icons">cancel</i></a>
                  </div>
                ))}
                <div className="col s3"><a id="add_pic_button" role="button" tabIndex={0} className="btn-floating btn-large waves-effect waves-light" onClick={this.addButtonOnClick} onKeyDown={this.addButtonOnClick}><i className="material-icons">add</i></a></div>
                {this.placeHolder}
                <div className="row">
                  <div className="col s12">
                    <a id="upload_btn" className="waves-effect waves-light btn" onClick={this.uploadButtonOnClick} onKeyDown={this.uploadButtonOnClick} role="button" tabIndex={-1}>upload</a>
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

FileUploadBox.propTypes = {
  id: PropTypes.array,
  file: PropTypes.array,
  imagePreviewUrl: PropTypes.array,
  imageInsert: PropTypes.func.isRequired,
  imageUpload: PropTypes.func.isRequired,
  imageRemove: PropTypes.func.isRequired,
};

FileUploadBox.defaultProps = {
  id: [],
  file: [],
  imagePreviewUrl: [],
};

