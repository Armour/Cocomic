import { connect } from 'react-redux';
import { newBookCover, bookUpload } from 'actions/uploadBook';
import { NewBook } from 'components/UploadBook';
import { fromJS } from 'immutable';

const mapStateToProps = (state) => {
  if (state.bookCover) {
    let fileObj;
    let coverUrl;
    state.bookCover.valueSeq().forEach((value) => {
      fileObj = value.get('file');
      coverUrl = value.get('coverPreviewUrl');
    });
    return {
      file: fileObj,
      coverPreviewUrl: coverUrl,
    };
  }
  return {
    file: fromJS([]),
    coverPreviewUrl: '',
  };
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

