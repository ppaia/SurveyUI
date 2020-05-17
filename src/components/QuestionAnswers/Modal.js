import React, { Component } from "react";
import Loader from 'react-loader-spinner';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ulData: [],
      isLoading: false
    };
  }

  render() {

    let ulData = <Loader
      className="bars_loader popup_loader"
      type="Bars"
      color="#00BFFF"
      height={50}
      width={50}
      timeout={0} //3 secs
    />;
    if (this.props.children) {
      ulData = this.props.children;
    }

    return (
      <div className="popup">
        <div className="popup_inner bg-light text-dark">
          <button
            className="float-right close-button"
            onClick={this.props.closePopup}
          >
            X
          </button>
          <div className="card-header">
            <h3>Sub Questions</h3>
          </div>
          <div className="card-body">
            <div>
              {ulData}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
