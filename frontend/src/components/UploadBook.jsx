import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

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
  }
  uploadButtonOnClick(e) {
    e.preventDefault();
    this.props.bookUpload({
      title: titleInput.value,
      discription: discriptionInput.value,
      coverfile: bookCover.file,
      coverPreviewUrl: bookCover.coverPreviewUrl,
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
    bookCover = {
      file: this.props.file,
      coverPreviewUrl: this.props.coverPreviewUrl,
    };
    if (bookCover.coverPreviewUrl) {
      this.previewSrc = bookCover.coverPreviewUrl;
      this.displayText = { display: 'none' };
    }
    return (
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
                <div className="row">
                  <div className="col s12">
                    <a id="upload_book_btn" className="waves-effect waves-light btn" onClick={this.uploadButtonOnClick} onKeyDown={this.uploadButtonOnClick} role="button" tabIndex={-1}>upload</a>
                  </div>
                </div>
                <input id="upload_book_input" type="file" ref={this.setFileInput} onChange={(e) => { this.handleCoverChange(e); }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewBook.propTypes = {
  file: PropTypes.object,
  coverPreviewUrl: PropTypes.string,
  newBookCover: PropTypes.func.isRequired,
  bookUpload: PropTypes.func.isRequired,
};

NewBook.defaultProps = {
  file: fromJS([]),
  coverPreviewUrl: '',
};
