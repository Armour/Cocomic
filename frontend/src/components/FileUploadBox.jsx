import React from 'react';
import PropTypes from 'prop-types';

export class FileUploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.addButtonOnClick = this.addButtonOnClick.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setTitleInput = this.setTitleInput.bind(this);
    this.setFormInput = this.setFormInput.bind(this);
    this.setDescriptionInput = this.setDescriptionInput.bind(this);
    this.uploadButtonOnClick = this.uploadButtonOnClick.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
    this.handleDescriptionOnBlur = this.handleDescriptionOnBlur.bind(this);
    this.handleTitleOnBlur = this.handleTitleOnBlur.bind(this);
    this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="170" width="170" /></div>);
    this.fileInput = null;
    this.formInput = null;
    this.discriptionInput = '';
    this.titleInput = '';
    this.imagePreview = [];
    this.imageIdCounter = 0;
  }

  componentDidMount() {
    if (this.props.modalId !== undefined) {
      $('.modal').modal({
        dismissible: true,
        opacity: 0.5,
        inDuration: 300,
        outDuration: 200,
      });
    }
  }

  setFormInput(node) {
    this.formInput = node;
  }

  setInput(node) {
    this.fileInput = node;
  }

  setTitleInput(node) {
    this.titleInput = node;
  }

  setDescriptionInput(node) {
    this.discriptionInput = node;
  }

  addButtonOnClick() {
    this.fileInput.click();
  }

  handleDescriptionOnBlur(e) {
    e.preventDefault();
    this.props.descriptionUpload({
      description: this.discriptionInput.value,
    });
  }

  handleTitleOnBlur(e) {
    e.preventDefault();
    this.props.titleUpload({
      title: this.titleInput.value,
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
        this.imageIdCounter += 1;
        this.props.imageInsert({
          id: 'img'.concat(String(this.imageIdCounter)),
          file: fileObject,
          imagePreviewUrl: reader.result,
        });
      };
      fileObject = e.target.files[i];
      for (let j = 0; j < this.imagePreview.length; j += 1) {
        if (this.imagePreview[j].file.name === fileObject.name) duplicateFlag = true;
      }
      if (!duplicateFlag) reader.readAsDataURL(fileObject);
    }
    this.formInput.reset();
  }

  uploadButtonOnClick(e) {
    e.preventDefault();
    const imageArray = [];
    for (let i = 0; i < this.imagePreview.length; i += 1) {
      imageArray.push({
        imageURL: this.imagePreview[i].imageURL,
      });
    }
    this.props.imageUpload(this.titleInput.value, this.discriptionInput.value, imageArray);
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
    this.imagePreview = [];
    for (let i = 0; i < this.props.id.length; i += 1) {
      if (this.props.imagePreviewUrl[i]) {
        this.imagePreview.push({
          id: this.props.id[i],
          file: this.props.file[i],
          imageURL: this.props.imagePreviewUrl[i],
        });
      }
    }
    if (this.imagePreview.length % 4 === 0) {
      this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="175" width="175" /></div>);
    }
    const inputComp = (
      <div>
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
        {this.imagePreview.map((image, index) => (
          <div key={image.id} className="col s3">
            <img id={index} src={image.imageURL} alt="placeholder" height="170px" width="170px" />
            <a id="cancel_pic_button" role="button" tabIndex={-2} className="btn-floating btn-tiny waves-effect waves-light" onClick={this.cancelButtonOnClick} onKeyDown={this.cancelButtonOnClick}><i id={image.id} className="material-icons">cancel</i></a>
          </div>
        ))}
        <div className="col s3"><a id="add_pic_button" role="button" tabIndex={0} className="btn-floating btn-large waves-effect waves-light" onClick={this.addButtonOnClick} onKeyDown={this.addButtonOnClick}><i className="material-icons">add</i></a></div>
        {this.placeHolder}
        <form ref={this.setFormInput}>
          <input id="upload_input" type="file" multiple ref={this.setInput} onChange={(e) => { this.handlePicChange(e); }} />
        </form>
      </div>
    );
    if (this.props.modalId !== undefined) {
      return (
        <div id={this.props.modalId} className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>New Chapter</h4>
            {inputComp}
          </div>
          <div className="modal-footer">
            <a onClick={this.uploadButtonOnClick} className="modal-action modal-close waves-effect waves-green btn-flat ">upload</a>
          </div>
        </div>
      );
    }
    return (
      <div className="upload-box-wrapper">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title center-align"> New Chapter </span>
                {inputComp}
                <div className="row">
                  <div className="col s12">
                    <a id="upload_btn" className="waves-effect waves-light btn" style={buttonStyle} onClick={this.uploadButtonOnClick} onKeyDown={this.uploadButtonOnClick} role="button" tabIndex={-1}>upload</a>
                  </div>
                </div>
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
  modalId: PropTypes.string,
};

FileUploadBox.defaultProps = {
  id: [],
  file: [],
  fromNewBook: false,
  imagePreviewUrl: [],
  modalId: undefined,
};

