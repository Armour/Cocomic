import { connect } from 'react-redux';
import { imageInsert } from 'actions/UploadImage';
import { FileUploadBox } from 'components/FileUploadBox';
import { fromJS } from 'immutable';

const mapStateToProps = (state) => {
  const newImg = state.images[state.images.length - 1];
  if (newImg) {
    return {
      id: newImg.id,
      file: newImg.file,
      imagePreviewUrl: newImg.imagePreviewUrl,
    };
  }
  return {
    id: 'img0',
    file: fromJS([]),
    imagePreviewUrl: '',
  };
};

const mapDispatchToProps = dispatch => ({
  imageInsert: (data) => {
    dispatch(imageInsert(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileUploadBox);
