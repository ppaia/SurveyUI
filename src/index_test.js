import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import MacysHeader from "./components/Header/MacysHeader";
import Popup from "reactjs-popup";
import ScreenCapture from "./components/ScreenCapture";
import "./index2.css";
import "./components/Home/home"
// import "./index.css";
import Test from "./components/test";
import Navbar from "./components/navbar";
// import './App.css';
// import './styles.css';
import Footer from './components/Footer/Footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUser, faCaretDown, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Home from './components/Home/home'

library.add(faSearch, faUser, faCaretDown, faAngleDown, faAngleUp);

class Mainpage extends Component {
  constructor() {
    super();
    this.state = {
        screenCapture: "",
        open: false,
        title: "gimmeatitle"
    }
   
  }

  handleScreenCapture = screenCapture => {
    this.setState(
      {
        screenCapture
      },
      () => {
        screenCapture && this.openModal();
      }
    );
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false, screenCapture: "" });
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSave = () => {
    console.log(this.state.title, this.state.screenCapture);
  };

  render() {
    const { screenCapture } = this.state;
    return (
<ScreenCapture onEndCapture={this.handleScreenCapture}>
{({ onStartCapture }) => (
  <>
    <header>
      <Navbar capture={onStartCapture} />
    </header>
    <main>
      <Test />
      {/* <Home/> */}
      {/* <div>
        <MacysHeader handlerFromParent={this.handleData} handlerForSurvey={this.handleSurvey} handlerPageSwitch={this.handlePage} />
        <Home/>
        <Footer />
      </div> */}
    </main>
    <Popup open={this.state.open} modal closeOnDocumentClick>
      <div className="modal">
        <div className="modal__header">
          <button onClick={this.closeModal}>&times;</button>
        </div>
        <div className="modal__body">
          <div>
            <label>Title</label>
            <input
              type="text"
              onChange={this.handleOnChange}
              name="title"
              value={this.state.title}
            />
          </div>
          <div className="image__container">
            {screenCapture && (
              <img src={screenCapture} alt="screen capture" />
            )}
          </div>
        </div>
        <div className="modal__footer">
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.closeModal}>Cancel</button>
        </div>
        {/* {screenCapture && <img src={screenCapture} alt="screen capture" />} */}
      </div>
    </Popup>
  </>
)}
</ScreenCapture>
    );
  }
}

ReactDOM.render(<Mainpage />, document.getElementById("root"));
