import React, { Component } from "react";
import AgeGraph from "./AgeGraph";
import SurveyGraph from "./SurveyGraph";
import GenderGraph from "./GenderGraph";
import SearchCountGraph from "./SearchCountGraph";
import PincodeGraph from "./PincodeGraph";
import Surveys from "./Surveys";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      toggleSurveys: false
    };
  }

  toggleSurveys() {
    this.setState({
      toggleSurveys: !this.state.toggleSurveys
    });
  }

  render() {
    let errors = "";
    if (this.state.errors) {
      errors = this.state.errors.map((item, index) => (
        <div key={index} className="alert alert-error">
          {item}
        </div>
      ));
    }

    let surveys = "";
    if (this.state.toggleSurveys) {
      surveys = (
        <Surveys />
      );
    }


    return (
      <div className="container-fluid pad_0_4rem mb-5">
        <div className="row">
          <div className="col d-flex">
            <h2 className="mt-3 title_head">Dashboard</h2>
            <h3 className="mt-3 title_head text-right"><button onClick={this.toggleSurveys.bind(this)} className="btn btn-light">Show Surveys</button></h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {errors}
          </div>
        </div>
        <div className="row">
          <div className={"chart-container chart_sizes"}>
            <AgeGraph />
            <SurveyGraph />
          </div>
          <div className={"chart-container chart_sizes"}>
            <GenderGraph />
            <SearchCountGraph />
          </div>
          <div className={"chart-container chart_sizes"}>
            <PincodeGraph />
          </div>
        </div>
        {surveys}
      </div>
    );
  }
}

export default RootComponent;
