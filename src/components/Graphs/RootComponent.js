import React, { Component } from "react";
import AgeGraph from "./AgeGraph";
import SurveyGraph from "./SurveyGraph";
import GenderGraph from "./GenderGraph";
import SearchCountGraph from "./SearchCountGraph";
import PincodeGraph from "./PincodeGraph";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
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

    return (
      <div className="container-fluid">
        <div className="row">
          <h2 className="mt-3 title_head">Home</h2>
          {errors}
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
      </div>
    );
  }
}

export default RootComponent;
