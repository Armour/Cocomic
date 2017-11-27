import React from 'react';
import PropTypes from 'prop-types';

let fileInput;
let discriptionInput;
let titleInput;
let imagePreview = [];
let imageIdCounter = 0;

const addButtonOnClick = () => {
  fileInput.click();
};

const setInput = (node) => {
  fileInput = node;
};

const setTitleInput = (node) => {
  titleInput = node;
};

export const setDescriptionInput = (node) => {
  discriptionInput = node;
};

export class FileUploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.addButtonOnClick = addButtonOnClick.bind(this);
    this.setInput = setInput.bind(this);
    this.setTitleInput = setTitleInput.bind(this);
    this.setDescriptionInput = setDescriptionInput.bind(this);
    this.uploadButtonOnClick = this.uploadButtonOnClick.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
    this.handleDescriptionOnBlur = this.handleDescriptionOnBlur.bind(this);
    this.handleTitleOnBlur = this.handleTitleOnBlur.bind(this);
    this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>);
  }

  handleDescriptionOnBlur(e) {
    e.preventDefault();
    this.props.descriptionUpload({
      description: discriptionInput.value,
    });
  }

  handleTitleOnBlur(e) {
    e.preventDefault();
    this.props.titleUpload({
      title: titleInput.value,
    });
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
    const imageArray = [];
    for (let i = 0; i < imagePreview.length; i += 1) {
      imageArray.push({
        imageURL: imagePreview[i].imageURL,
      });
    }
    this.props.imageUpload({
      /* title: "23333"
      description: "......",
      parentId: "",
      bookId: "",
      images: [{"imageURL": "imagedata......"}, {}, {}] */
      title: titleInput.value,
      description: discriptionInput.value,
      parentId: '0',
      bookId: '0',
      images: imageArray,
    });
  }

  cancelButtonOnClick(e) {
    e.preventDefault();
    this.props.imageRemove(e.target.id);
  }

  render() {
    let buttonStyle;
    if (this.props.fromNewBook) {
      buttonStyle = { display: 'none' };
    } else {
      buttonStyle = {
        backgroundColor: '$primary-color',
        display: 'block',
        height: '52px',
        paddingTop: '10px',
        paddingBottom: '10px',
        top: '20px',
      };
    }
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
                    <input id="title" onBlur={this.handleTitleOnBlur} ref={this.setTitleInput} type="text" className="validate" />
                    <label htmlFor="title">Title</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="description" onBlur={this.handleDescriptionOnBlur} ref={this.setDescriptionInput} type="text" className="validate" />
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
                    <a id="upload_btn" className="waves-effect waves-light btn" style={buttonStyle} onClick={this.uploadButtonOnClick} onKeyDown={this.uploadButtonOnClick} role="button" tabIndex={-1}>upload</a>
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
  fromNewBook: PropTypes.bool,
  imageInsert: PropTypes.func.isRequired,
  imageUpload: PropTypes.func.isRequired,
  imageRemove: PropTypes.func.isRequired,
  descriptionUpload: PropTypes.func.isRequired,
  titleUpload: PropTypes.func.isRequired,
};

FileUploadBox.defaultProps = {
  id: [],
  file: [],
  fromNewBook: false,
  imagePreviewUrl: [],
};

