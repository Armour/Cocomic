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
    state.images.valueSeq().forEach((value) => {
      if (typeof value === 'string') {
        des = value;
      }
    });
    returnState.chapterDescription = des;
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

