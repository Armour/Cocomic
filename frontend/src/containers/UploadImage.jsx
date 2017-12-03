import { connect } from 'react-redux';
import { imageInsert, imageUpload, imageRemove, descriptionUpload, titleUpload, editUpload } from 'actions/uploadImage';
import { FileUploadBox } from 'components/FileUploadBox';

const mapStateToProps = (state) => {
  let getImageNum = 0;
  let getImageContent = {};
  let logInStatus = false;
  let getBookList = {};
  const ids = [];
  const files = [];
  const imagePreviewUrls = [];
  if (state.getImages) {
    getImageContent = state.getImages.toJS();
  }
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
  if (state.books) {
    getBookList = state.books.toJS();
  }
  if (state.uploadImages) {
    state.uploadImages.valueSeq().forEach((value) => {
      if (typeof value !== 'string') {
        ids.push(value.get('id'));
        files.push(value.get('file'));
        imagePreviewUrls.push(value.get('imagePreviewUrl'));
      }
    });
  }
  return {
    id: ids,
    file: files,
    imagePreviewUrl: imagePreviewUrls,
    getImageSize: getImageNum,
    isLoggedin: logInStatus,
    bookList: getBookList,
    getImageData: getImageContent,
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
  editUpload: (data) => {
    dispatch(editUpload(data));
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
