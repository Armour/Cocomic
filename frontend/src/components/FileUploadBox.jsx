import React from 'react';
import PropTypes from 'prop-types';
import Materialize from 'materialize-css';
import ImageLoader from 'containers/ImageLoader';

export class FileUploadBox extends React.Component {
  constructor(props) {
    super(props);
    this.addButtonOnClick = this.addButtonOnClick.bind(this);
    this.setInput = this.setInput.bind(this);
    this.setTitleInput = this.setTitleInput.bind(this);
    this.setFormInput = this.setFormInput.bind(this);
    this.setModalBoxButton = this.setModalBoxButton.bind(this);
    this.setDescriptionInput = this.setDescriptionInput.bind(this);
    this.uploadButtonOnClick = this.uploadButtonOnClick.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.cancelButtonOnClick = this.cancelButtonOnClick.bind(this);
    this.handleDescriptionOnBlur = this.handleDescriptionOnBlur.bind(this);
    this.handleTitleOnBlur = this.handleTitleOnBlur.bind(this);
    if (!this.props.fromNewBook) this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="170" width="170" /></div>);
    else this.placeHolder = (<div className="col s3"><img src={require('../image/blank2.png')} alt="placeholder" height="170" width="170" /></div>);
    this.fileInput = null;
    this.formInput = null;
    this.modalBoxButton = null;
    this.discriptionInput = '';
    this.titleInput = '';
    this.imagePreview = [];
    this.imageIdCounter = 0;
    this.displayUpload = { display: 'inline' };
    this.displayCircle = { display: 'none' };
    this.uploadTrigger = false;
    this.uploadNumber = 0;
    this.state = { editChapterImages: [] };
    if (this.props.modalId) this.chapterNumber = this.props.modalId.split('-');
  }

  componentWillMount() {
    if (this.chapterNumber) {
      this.setState({ editChapterImages: this.props.bookList[this.props.bookId].chapters[this.chapterNumber[1]].images });
      this.chapterTitle = this.props.bookList[this.props.bookId].chapters[this.chapterNumber[1]].title;
      this.chapterDesc = this.props.bookList[this.props.bookId].chapters[this.chapterNumber[1]].description;
    }
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

  componentWillUpdate() {
    if (this.uploadTrigger && this.uploadNumber <= this.props.getImageSize) this.uploadNumber = this.props.getImageSize;
    if (this.uploadTrigger && this.uploadNumber > this.props.getImageSize) {
      this.uploadTrigger = false;
      this.displayCircle = { display: 'none' };
      this.displayUpload = { display: 'inline' };
      this.modalBoxButton.click();
    }
  }

  setFormInput(node) {
    this.formInput = node;
  }

  setInput(node) {
    this.fileInput = node;
  }

  setModalBoxButton(node) {
    this.modalBoxButton = node;
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
    if (!this.props.isLoggedin) {
      Materialize.toast('Please log in before upload pictures :)', 3000, 'rounded');
      return;
    }
    const imageArray = [];
    this.uploadTrigger = true;
    this.uploadNumber = 0;
    if (this.props.modalId && this.props.modalId.startsWith('add_chapter_modal') && this.imagePreview.length === 0) return;
    if (this.imagePreview.length === 0 && this.state.editChapterImages.length === 0) return;
    this.displayUpload = { display: 'none' };
    this.displayCircle = {
      display: 'inline-block',
      position: 'relative',
      left: '-20px',
    };
    if (this.props.modalId && this.props.modalId.startsWith('add')) {
      for (let i = 0; i < this.imagePreview.length; i += 1) {
        imageArray.push({
          imageURL: this.imagePreview[i].imageURL,
        });
      }
      this.props.imageUpload(this.titleInput.value, this.discriptionInput.value, imageArray);
    } else if (this.props.modalId && this.props.modalId.startsWith('edit')) {
      for (let i = 0; i < this.state.editChapterImages.length; i += 1) {
        imageArray.push({
          imageURL: this.props.getImageData[this.state.editChapterImages[i]],
        });
      }
      for (let i = 0; i < this.imagePreview.length; i += 1) {
        imageArray.push({
          imageURL: this.imagePreview[i].imageURL,
        });
      }
      const data = {
        chapterId: this.chapterNumber[1],
        title: this.titleInput.value,
        description: this.discriptionInput.value,
        images: imageArray,
      };
      this.props.editUpload(data, this.props.bookId);
    }
  }

  cancelButtonOnClick(e) {
    e.preventDefault();
    if (e.target.id.startsWith('img')) {
      this.props.imageRemove(e.target.id);
    } else {
      const index = this.state.editChapterImages.indexOf(e.target.id);
      if (index > -1) {
        const newArray = this.state.editChapterImages;
        newArray.splice(index, 1);
        this.setState({ editChapterImages: newArray });
      }
    }
  }

  render() {
    let editComp = null;
    if (this.props.modalId && this.props.modalId.startsWith('edit')) {
      const editArray = [];
      for (let i = 0; i < this.state.editChapterImages.length; i += 1) {
        editArray.push({
          id: this.state.editChapterImages[i],
          imageHash: this.state.editChapterImages[i],
        });
      }
      editComp = (
        <div>
          <div className="row">
            <div className="input-field col s12">
              <input id="title" onBlur={this.handleTitleOnBlur} ref={this.setTitleInput} type="text" className="validate" defaultValue={this.chapterTitle} />
              <label htmlFor="title">Title</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="description" onBlur={this.handleDescriptionOnBlur} ref={this.setDescriptionInput} type="text" className="validate" defaultValue={this.chapterDesc} />
              <label htmlFor="description">Description</label>
            </div>
          </div>
          {editArray.map((image, index) => (
            <div key={image.id} className="col s3">
              <ImageLoader id={index} img_url={image.imageHash} alt="placeholder" height="170px" width="170px" />
              <a id="cancel_pic_button" role="button" tabIndex={-2} className="btn-floating btn-tiny waves-effect waves-light" onClick={this.cancelButtonOnClick} onKeyDown={this.cancelButtonOnClick}><i id={image.id} className="material-icons">cancel</i></a>
            </div>
          ))}
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
    }
    this.imagePreview = [];
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
    for (let i = 0; i < this.props.id.length; i += 1) {
      if (this.props.imagePreviewUrl[i]) {
        this.imagePreview.push({
          id: this.props.id[i],
          file: this.props.file[i],
          imageURL: this.props.imagePreviewUrl[i],
        });
      }
    }
    for (let i = 0; i < this.imagePreview.length; i += 1) {
      for (let j = i + 1; j < this.imagePreview.length; j += 1) {
        if (this.imagePreview[i].id > this.imagePreview[j].id || this.imagePreview[i].id.length > this.imagePreview[j].id.length) {
          const temp = this.imagePreview[i];
          this.imagePreview[i] = this.imagePreview[j];
          this.imagePreview[j] = temp;
        }
      }
    }
    if (this.imagePreview.length % 4 === 0) {
      if (!this.props.fromNewBook) this.placeHolder = (<div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="175" width="175" /></div>);
      else this.placeHolder = (<div className="col s3"><img src={require('../image/blank2.png')} alt="placeholder" height="175" width="175" /></div>);
    }
    const loadingCircle = (
      <div className="preloader-wrapper active" style={this.displayCircle}>
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    );
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
    const newbookComp = (
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
            <img id={index} src={image.imageURL} alt="placeholder" height="200px" width="200px" />
            <a id="cancel_pic_button_newbook" role="button" tabIndex={-2} className="btn-floating btn-tiny waves-effect waves-light" onClick={this.cancelButtonOnClick} onKeyDown={this.cancelButtonOnClick}><i id={image.id} className="material-icons">cancel</i></a>
          </div>
        ))}
        <div className="col s3"><a id="add_pic_button" role="button" tabIndex={0} className="btn-floating btn-large waves-effect waves-light" onClick={this.addButtonOnClick} onKeyDown={this.addButtonOnClick}><i className="material-icons">add</i></a></div>
        {this.placeHolder}
        <form ref={this.setFormInput}>
          <input id="upload_input" type="file" multiple ref={this.setInput} onChange={(e) => { this.handlePicChange(e); }} />
        </form>
      </div>
    );
    if (this.props.modalId && this.props.modalId.startsWith('add_chapter_modal')) {
      return (
        <div id={this.props.modalId} className="modal modal-fixed-footer" ref={this.setModal} >
          <div className="modal-content">
            <h4>Add Chapter After {this.props.prevChapterTitle}</h4>
            {inputComp}
            <button className="modal-action modal-close" id="modalBoxButton" ref={this.setModalBoxButton}> hidden button </button>
          </div>
          <div className="modal-footer">
            <a onClick={this.uploadButtonOnClick} style={this.displayUpload} className="waves-effect waves-green btn-flat ">upload</a>
            {loadingCircle}
          </div>
        </div>
      );
    }
    if (this.props.modalId && this.props.modalId.startsWith('edit_chapter_modal')) {
      return (
        <div id={this.props.modalId} className="modal modal-fixed-footer" ref={this.setModal} >
          <div className="modal-content">
            <h4>Edit Chapter</h4>
            {editComp}
            <button className="modal-action modal-close" id="modalBoxButton" ref={this.setModalBoxButton}> hidden button </button>
          </div>
          <div className="modal-footer">
            <a onClick={this.uploadButtonOnClick} style={this.displayUpload} className="waves-effect waves-green btn-flat ">upload</a>
            {loadingCircle}
          </div>
        </div>
      );
    }
    if (this.props.fromNewBook) {
      return (
        <div className="upload-box-wrapper">
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title center-align"> New Chapter </span>
                  {newbookComp}
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
    return null;
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
  editUpload: PropTypes.func.isRequired,
  descriptionUpload: PropTypes.func.isRequired,
  titleUpload: PropTypes.func.isRequired,
  getImageSize: PropTypes.number,
  isLoggedin: PropTypes.bool,
  modalId: PropTypes.string,
  prevChapterTitle: PropTypes.string,
  bookList: PropTypes.object,
  bookId: PropTypes.number,
  getImageData: PropTypes.object,
};

FileUploadBox.defaultProps = {
  id: [],
  file: [],
  fromNewBook: false,
  imagePreviewUrl: [],
  getImageSize: 0,
  isLoggedin: false,
  modalId: undefined,
  prevChapterTitle: '',
  bookList: {},
  bookId: 0,
  getImageData: {},
};

