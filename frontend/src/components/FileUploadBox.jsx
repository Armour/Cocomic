import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

let fileInput;
const imagePreview = [];

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
    this.currentImage = 0;
    this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>);
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.file !== this.state.file && prevState.imagePreviewUrl !== this.state.imagePreviewUrl) {
      for (let i = 0; i < imagePreview.length; i += 1) {
        if (imagePreview[i].file.name === prevState.file.name) return;
      }
      imagePreview.push({
        id: 'img'.concat(String(imagePreview.length)),
        file: prevState.file,
        imageURL: prevState.imagePreviewUrl,
      });
      this.currentImage = this.props.id;
      this.props.imageInsert({
        id: 'img'.concat(String(imagePreview.length)),
        file: prevState.file,
        imagePreviewUrl: prevState.imagePreviewUrl,
      });
    }
  }

  handlePicChange(e) {
    e.preventDefault();
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
                <div className="col s3"><a id="add_pic_button" role="button" tabIndex={0} className="btn-floating btn-large waves-effect waves-light" onClick={this.addButtonOnClick} onKeyDown={this.addButtonOnClick}><i className="material-icons">add</i></a></div>
                {this.placeHolder}
                {imagePreview.map((image, index) => (
                  <div key={image.id} className="col s3"><img id={index} src={image.imageURL} alt="placeholder" height="200" width="200" /></div>
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

FileUploadBox.propTypes = {
  id: PropTypes.string,
  file: PropTypes.object,
  imagePreviewUrl: PropTypes.string,
  imageInsert: PropTypes.func.isRequired,
};

FileUploadBox.defaultProps = {
  id: 'img0',
  file: fromJS([]),
  imagePreviewUrl: '',
};

