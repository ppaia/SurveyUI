import React, { Component } from "react";
import Loader from 'react-loader-spinner';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ulData: [],
      ulDataLength: 0,
      surveyId: this.props.surveyId,
      productName: this.props.productName,
      isLoading: false
    };
  }

  fetchData() {
    // Where we're fetching data from
    fetch(process.env.REACT_APP_URL + `rest/chatbot/survey/getsurveygraph?survey_id=` + this.state.surveyId)
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        if (data.length) {
          this.setState({
            ulData: data,
            ulDataLength: data.length
          })
        } else {
          this.setState({
            ulDataLength: "NA"
          })
        }
      })
      // Catch any errors we hit and update the app
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchData();
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
    if (this.state.ulData.length && this.state.ulDataLength) {
      ulData = this.state.ulData.map((item, index) => {
        return (
          <ul key={index} className="qas_ul">
            <li className="question bg-dark text-light"><label>Question: </label>{item.questions}</li>
            <li className="answer bg-light text-dark"><label>Answer: </label>{item.answers}</li>
          </ul>
        );
      })
    } else if (this.state.ulDataLength === "NA") {
      ulData = "No Data!";
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
            <h3>{this.state.productName}</h3>
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

export default Popup;
