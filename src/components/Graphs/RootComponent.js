import React, { Component } from "react";
import AgeGraph from "./AgeGraph";
import SurveyGraph from "./SurveyGraph";
import GenderGraph from "./GenderGraph";
import SearchCountGraph from "./SearchCountGraph";
import PincodeGraph from "./PincodeGraph";
import Surveys from "./Surveys";
import QuestionAnswers from "./../QuestionAnswers/QuestionAnswers";

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      toggleSurveys: false,
      createQas: false
    };
  }

  createQas() {
    this.setState({
      createQas: !this.state.createQas
    });
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

    let qaArray = [5, 6, 7, 15];
    let QaGraphs = "";
    if (qaArray.length) {
      QaGraphs = qaArray.map(qid => {
        return (<SearchCountGraph key={qid} qid={qid} />);
      })
    }

    let QaData = "";
    if (this.state.createQas) {
      QaData = <QuestionAnswers />;
    }


    return (
      <div className="container-fluid pad_0_4rem mb-5">
        <div className="row">
          <div className="col d-flex">
            <h2 className="mt-3 title_head">Dashboard</h2>
            <h3 className="mt-3 title_head text-right"><button onClick={this.createQas.bind(this)} className="btn btn-light">Create QAs</button></h3>
            <h3 className="mt-3 title_head text-right"><button onClick={this.toggleSurveys.bind(this)} className="btn btn-light">Show Surveys</button></h3>
          </div>
        </div>
        {QaData}
        <div className="row">
          <div className="col">
            {errors}
          </div>
        </div>
        <div className="row">
          <div className={"chart-container chart_sizes"}>
            <AgeGraph />
            <SurveyGraph />
            <GenderGraph />
            <PincodeGraph />
          </div>
          <div className={"chart-container chart_sizes"}>
            {QaGraphs}
          </div>
        </div>
        {surveys}
      </div>
    );
  }
}

export default RootComponent;
