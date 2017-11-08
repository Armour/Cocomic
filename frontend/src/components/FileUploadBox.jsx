import React from 'react';

export class FileUploadBox extends React.Component {
  render() {
    return (
      <div className="upload-box-wrapper">
        <div className="row">
          <div className="col s12">
            <div className="card z-depth-5">
              <div className="card-content">
                <span className="card-title center-align"> New Chapter </span>
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="description" type="text" className="validate" />
                      <label htmlFor="description">Description</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3"><img src="https://lorempixel.com/250/250/nature/3" alt="placeholder" height="200" width="200" /></div>
                    <div className="col s3"><img src="https://lorempixel.com/250/250/nature/3" alt="placeholder" height="200" width="200" /></div>
                    <div className="col s3"><img src="https://lorempixel.com/250/250/nature/3" alt="placeholder" height="200" width="200" /></div>
                    <div className="col s3"><img src="https://lorempixel.com/250/250/nature/3" alt="placeholder" height="200" width="200" /></div>
                  </div>
                  <div className="row">
                    <div className="col s3"><img src="https://lorempixel.com/250/250/nature/3" alt="placeholder" height="200" width="200" /></div>
                    <div className="col s3"><a id="add_pic_button" className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">add</i></a></div>
                    <div className="col s3"><img src={require('../image/blank.png')} alt="hello" height="200" width="200" /></div>
                    <div className="col s3"><img src={require('../image/blank.png')} alt="placeholder" height="200" width="200" /></div>
                  </div>
                </form>
                <div className="row">
                  <div className="col s12">
                    <a id="upload_btn" className="waves-effect waves-light btn">upload</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
