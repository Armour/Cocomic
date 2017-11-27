import { connect } from 'react-redux';
import { newBookCover, bookUpload } from 'actions/uploadBook';
import { NewBook } from 'components/UploadBook';
import { fromJS } from 'immutable';

const mapStateToProps = (state) => {
  let returnState = {
    file: fromJS([]),
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
  if (state.images) {
    let des;
    let title;
    state.images.keySeq().forEach((key) => {
      if (key === 'title') {
        title = state.images.get(key);
      }
      if (key === 'description') {
        des = state.images.get(key);
      }
    });
    const imagePreviewUrls = [];
    state.images.valueSeq().forEach((value) => {
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

