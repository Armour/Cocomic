import { connect } from 'react-redux';
import { imageInsert, imageUpload, imageRemove, descriptionUpload, titleUpload } from 'actions/uploadImage';
import { FileUploadBox } from 'components/FileUploadBox';

const mapStateToProps = (state) => {
  let getImageNum;
  let logInStatus;
  if (state.fetchingData) {
    getImageNum = state.fetchingData.valueSeq().size;
  }
  if (state.register) {
    state.register.keySeq().forEach((key) => {
      if (key === 'isLoggedIn') {
        logInStatus = state.register.get(key);
      }
    });
  }
  if (state.uploadImages) {
    const ids = [];
    const files = [];
    const imagePreviewUrls = [];
    state.uploadImages.valueSeq().forEach((value) => {
      if (typeof value !== 'string') {
        ids.push(value.get('id'));
        files.push(value.get('file'));
        imagePreviewUrls.push(value.get('imagePreviewUrl'));
      }
    });
    return {
      id: ids,
      file: files,
      imagePreviewUrl: imagePreviewUrls,
      getImageSize: getImageNum,
      isLoggedin: logInStatus,
    };
  }
  return {
    id: [],
    file: [],
    imagePreviewUrl: [],
    getImageSize: 0,
    isLoggedin: false,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  imageInsert: (data) => {
    dispatch(imageInsert(data));
  },
  imageUpload: (title, description, images) => {
    if (ownProps.fromNewBook) {
      /* title: "23333"
      description: "......",
      parentId: "",
      bookId: "",
      images: [{"imageURL": "imagedata......"}, {}, {}] */
      dispatch(imageUpload({
        title,
        description,
        parentId: '0',
        bookId: '0',
        images,
      }));
    } else {
      dispatch(imageUpload({
        title,
        description,
        parentId: ownProps.parentId,
        bookId: ownProps.bookId,
        images,
      }));
    }
  },
  imageRemove: (imgId) => {
    dispatch(imageRemove(imgId));
  },
  descriptionUpload: (data) => {
    dispatch(descriptionUpload(data));
  },
  titleUpload: (data) => {
    dispatch(titleUpload(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileUploadBox);
