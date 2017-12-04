import React from 'react';
import PropTypes from 'prop-types';
import UploadImage from 'containers/UploadImage';
import Materialize from 'materialize-css';

let fileInput;
let bookCover = {};
let discriptionInput;
let titleInput;

const imageOnClick = (e) => {
  e.preventDefault();
  fileInput.click();
};

const setFileInput = (node) => {
  fileInput = node;
};

const setDescriptionInput = (node) => {
  discriptionInput = node;
};

const setTitleInput = (node) => {
  titleInput = node;
};

export class NewBook extends React.Component {
  constructor(props) {
    super(props);
    this.imageOnClick = imageOnClick.bind(this);
    this.setFileInput = setFileInput.bind(this);
    this.uploadButtonOnClick = this.uploadButtonOnClick.bind(this);
    this.handleCoverChange = this.handleCoverChange.bind(this);
    this.setDescriptionInput = setDescriptionInput.bind(this);
    this.setTitleInput = setTitleInput.bind(this);
    this.previewSrc = require('../image/dash-rectangle.png');
    this.displayText = { display: 'inline' };
    this.newChapterBox = UploadImage;
    this.uploadTrigger = false;
    this.displayButton = {
      display: 'block',
      backgroundColor: '$primary-color',
      height: '52px',
      paddingTop: '10px',
      paddingBottom: '10px',
      top: '5px',
    };
    this.displayCircle = { display: 'none' };
    this.startRequest = false;
  }

  componentWillUpdate() {
    if (this.props.fetchedData['POST /book/addBook']) this.startRequest = true;
    if (this.startRequest && this.props.fetchedData['POST /book/addBook'] === undefined) window.location = '../userCenter';
  }

  uploadButtonOnClick(e) {
    e.preventDefault();
    if (!this.props.logOrNot.isLoggedIn) {
      Materialize.toast('Please log in before upload pictures :)', 3000, 'rounded');
      return;
    }
    if (bookCover.chapterImages.length === 0 || !bookCover.coverPreviewUrl) {
      Materialize.toast('The Book Cover and Chapter Images cannot be empty', 3000, 'rounded');
      return;
    }
    this.uploadTrigger = true;
    this.displayCircle = { display: 'inline-block' };
    this.displayButton = { display: 'none' };
    const imageArray = [];
    for (let i = 0; i < bookCover.chapterImages.length; i += 1) {
      imageArray.push({
        imageURL: bookCover.chapterImages[i],
      });
    }
    this.props.bookUpload({
      bookTitle: titleInput.value,
      coverImage: [{ imageURL: bookCover.coverPreviewUrl }],
      description: discriptionInput.value,
      chapters: [{
        title: bookCover.chapterTitle,
        description: bookCover.chapterDescription,
        images: imageArray,
      }],
    });
  }

  handleCoverChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const fileObj = e.target.files[0];

    reader.onloadend = () => {
      this.props.newBookCover({
        file: fileObj,
        coverPreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(fileObj);
  }

  render() {
    const loadingCircle = (
      <div className="preloader-wrapper big active" id="newBookCircle" style={this.displayCircle}>
        <div className="spinner-layer spinner-blue">
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
        <div className="spinner-layer spinner-red">
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
        <div className="spinner-layer spinner-yellow">
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
        <div className="spinner-layer spinner-green">
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
    bookCover = {
      file: this.props.file,
      coverPreviewUrl: this.props.coverPreviewUrl,
      chapterDescription: this.props.chapterDescription,
      chapterTitle: this.props.chapterTitle,
      chapterImages: this.props.chapterImages,
    };
    if (bookCover.coverPreviewUrl) {
      this.previewSrc = bookCover.coverPreviewUrl;
      this.displayText = { display: 'none' };
    }
    return (
      <div>
        <div className="upload-book-wrapper">
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title center-align"> New Book </span>
                  <div id="content-row" className="row">
                    <div className="col s4" id="coverPreview">
                      <a onClick={this.imageOnClick} onKeyDown={this.imageOnClick}>
                        <img src={this.previewSrc} alt="placeholder" width="300px" height="300px" />
                        <p id="uploadBookText" className="flow-text" style={this.displayText}>Upload <br /> &nbsp;&nbsp;Book <br /> &nbsp;Cover</p>
                      </a>
                    </div>
                    <div className="col s8">
                      <div className="row">
                        <div id="book_input_field" className="input-field col s8">
                          <input id="title" ref={this.setTitleInput} type="text" />
                          <label htmlFor="title">Book Title</label>
                        </div>
                      </div>
                      <div className="row">
                        <div id="book_input_field" className="input-field col s8">
                          <textarea id="descriptionArea" ref={this.setDescriptionInput} className="materialize-textarea" data-length="120" />
                          <label htmlFor="descriptionArea">Description</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input id="upload_book_input" type="file" ref={this.setFileInput} onChange={(e) => { this.handleCoverChange(e); }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <this.newChapterBox fromNewBook />
        <div className="row">
          <div className="col s8">
            <a id="add_chapter_btn" className="waves-effect waves-light btn" style={this.displayButton} onClick={this.uploadButtonOnClick} onKeyDown={this.uploadButtonOnClick} role="button" tabIndex={-1}>Upload</a>
          </div>
        </div>
        {loadingCircle}
      </div>
    );
  }
}

NewBook.propTypes = {
  file: PropTypes.object,
  coverPreviewUrl: PropTypes.string,
  chapterDescription: PropTypes.string,
  chapterTitle: PropTypes.string,
  chapterImages: PropTypes.array,
  fetchedData: PropTypes.object,
  logOrNot: PropTypes.object,
  newBookCover: PropTypes.func.isRequired,
  bookUpload: PropTypes.func.isRequired,
};

NewBook.defaultProps = {
  file: {},
  coverPreviewUrl: '',
  chapterDescription: '',
  chapterTitle: '',
  logOrNot: {},
  fetchedData: {},
  chapterImages: [],
};
