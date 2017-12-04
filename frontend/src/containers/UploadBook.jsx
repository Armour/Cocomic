import { connect } from 'react-redux';
import { newBookCover, bookUpload } from 'actions/uploadBook';
import { NewBook } from 'components/UploadBook';

const mapStateToProps = (state) => {
  let returnState = {
    file: {},
    chapterDescription: '',
    coverPreviewUrl: '',
  };
  if (state.bookCover) {
    let fileObj;
    let coverUrl;
    state.bookCover.valueSeq().forEach((value) => {
      fileObj = value.get('file');
      coverUrl = value.get('coverPreviewUrl');
    });
    returnState = {
      file: fileObj,
      coverPreviewUrl: coverUrl,
    };
  }
  if (state.fetchingData) {
    returnState.fetchedData = state.fetchingData.toJS();
  }
  if (state.register) {
    returnState.logOrNot = state.register.toJS();
  }
  if (state.uploadImages) {
    let des;
    let title;
    state.uploadImages.keySeq().forEach((key) => {
      if (key === 'title') {
        title = state.uploadImages.get(key);
      }
      if (key === 'description') {
        des = state.uploadImages.get(key);
      }
    });
    const imagePreviewUrls = [];
    state.uploadImages.valueSeq().forEach((value) => {
      if (typeof value !== 'string') {
        imagePreviewUrls.push(value.get('imagePreviewUrl'));
      }
    });
    returnState.chapterDescription = des;
    returnState.chapterTitle = title;
    returnState.chapterImages = imagePreviewUrls;
  }
  return returnState;
};

const mapDispatchToProps = dispatch => ({
  newBookCover: (data) => {
    dispatch(newBookCover(data));
  },
  bookUpload: (data) => {
    dispatch(bookUpload(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewBook);

