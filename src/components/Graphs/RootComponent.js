import React, { Component } from "react";
import AgeGraph from "./AgeGraph";
import SurveyGraph from "./SurveyGraph";
import GenderGraph from "./GenderGraph";
import SearchCountGraph from "./SearchCountGraph";
import PincodeGraph from "./PincodeGraph";
import Surveys from "./Surveys";
import QuestionAnswers from "./../QuestionAnswers/QuestionAnswers";
import Loader from 'react-loader-spinner';

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      toggleSurveys: false,
      toggleCreateQas: false,
      toggleGraphs: true
    };
  }

  toggleCreateQas() {
    this.setState({
      toggleCreateQas: true,
      toggleGraphs: false,
      toggleSurveys: false
    });
  }

  toggleGraphs() {
    this.setState({
      toggleGraphs: true,
      toggleSurveys: false,
      toggleCreateQas: false
    });
  }

  toggleSurveys() {
    this.setState({
      toggleSurveys: true,
      toggleGraphs: false,
      toggleCreateQas: false
    });
  }

  render() {
    let errors = "";
    if (this.state.errors.length) {
      debugger;
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
    if (this.state.toggleCreateQas) {
      QaData = <QuestionAnswers />;
    }

    let SurveyGraphsElement = "";
    if (this.state.toggleGraphs) {
      SurveyGraphsElement = <div>
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
      </div>;
    }


    return (
      <div className="container-fluid pad_0_4rem mb-5">
        <div className="row">
          <div className="col d-flex">
            <h2 className="mt-3 title_head">Dashboard</h2>
            <h3 className="mt-3 title_head text-right">
              <button onClick={this.toggleGraphs.bind(this)} className="btn btn-light mr-2">Graphs</button>
              <button onClick={this.toggleCreateQas.bind(this)} className="btn btn-light mr-2">Create QAs</button>
              <button onClick={this.toggleSurveys.bind(this)} className="btn btn-light">Show Surveys</button>
            </h3>
          </div>
        </div>
        {QaData}
        {SurveyGraphsElement}
        {surveys}
      </div>
    );
  }
}

export default RootComponent;
