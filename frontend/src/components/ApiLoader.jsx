// import React from 'react';
// import PropTypes from 'prop-types';

// export class ApiLoader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { url: 'api' };
//     this.onClick = this.onClick.bind(this);
//     this.onChange = this.onChange.bind(this);
//   }

//   onClick(e) {
//     e.preventDefault();
//     if (!this.state.url.trim()) {
//       return;
//     }
//     this.props.fetchData(this.state.url);
//   }

//   onChange(e) {
//     this.setState({ url: e.currentTarget.value });
//   }

//   render() {
//     return (
//       <div className="api-loader center-align z-depth-2">
//         <div className="input-field inline">
//           <input id="input-url-api-call" type="text" value={this.state.url} onChange={this.onChange} />
//         </div>
//         <a
//           className="btn waves-effect"
//           onClick={this.onClick}
//           onKeyDown={this.onClick}
//           role="button"
//           tabIndex="0"
//         >
//         Async Post Api Call
//         </a>
//       </div>
//     );
//   }
// }

// ApiLoader.propTypes = {
//   fetchData: PropTypes.func.isRequired,
// };
