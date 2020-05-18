import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import SubQuestionAnswers from "./SubQuestionAnswers";
import Modal from "./Modal";
import "./QA_Styles.css";

class QuestionAnswers extends Component {
  state = {
    question: "",
    options: [{
      optionId: "",
      optionName: ""
    }],
    showPopup: false,
    subQaId: "",
    subQasAdded: [],
    messages: []
  }

  handleQuestion = (e) => {
    e.preventDefault()
    let question = e.target.value;
    this.setState({
      question
    })
  }

  handleText = i => e => {
    let options = [...this.state.options]
    options[i] = {
      optionId: (e.target.value) ? "option_" + i : "",
      optionName: e.target.value
    }
    this.setState({
      options
    })
  }

  handleDelete = i => e => {
    e.preventDefault()
    let options = [
      ...this.state.options.slice(0, i),
      ...this.state.options.slice(i + 1)
    ]
    this.setState({
      options
    })
  }

  addOptions = e => {
    e.preventDefault()

    if (!this.state.question) {
      alert("Please fill the question first!");
      return false;
    }

    let options = this.state.options.concat([{
      optionId: "",
      optionName: ""
    }])
    this.setState({
      options
    })
  }

  addSubQuestion = (subId, optionName, e) => {

    if (!this.state.question) {
      alert("Please fill the question first!");
      return false;
    }

    if (!optionName) {
      alert("Please fill an option first!");
      return false;
    }
    this.setState({
      subQaId: subId,
      showPopup: !this.state.showPopup
    });

    console.log("Question: ", this.state.question);
    console.log("Options: ", this.state.options);
  }

  mergeSubQas = (qaData, e) => {
    e.preventDefault();
    let options = this.state.options;
    let subQasAdded = this.state.subQasAdded;

    options.map((item, index) => {
      if (qaData.qaId === item.optionId) {
        let sub_options = [];
        qaData.options.map((option, idx) => {
          if (option.optionName)
            sub_options.push(option.optionName);
        });
        if (qaData.question && sub_options.length) {
          options[index].options = sub_options;
          options[index].question = qaData.question;
          subQasAdded.push(qaData.qaId);
        } else {
          alert("Sub question and options must not be blank!");
          return false;
        }
      }
    });

    this.setState({
      showPopup: false,
      options,
      subQasAdded
    });

  }

  togglePopup(e) {
    e.preventDefault();
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.question) {
      alert("Question must be there!");
      return false;
    }

    if (!this.state.options[0].optionName) {
      alert("At-least one option must be there!");
      return false;
    }

    let messages = ["Successfully Submitted!"];
    this.setState({
      messages
    });
  }

  render() {
    let subqacontainer = "";
    if (this.state.showPopup) {
      subqacontainer = <Modal closePopup={this.togglePopup.bind(this)}>
        <div>
          <SubQuestionAnswers subId={this.state.subQaId} mergeSubQas={this.mergeSubQas} />
        </div>
      </Modal>;
    }

    let messages = "";
    if (this.state.messages.length) {
      messages = <div className="row my-3"><div className="col"><span className="alert alert-success">{this.state.messages[0]}</span></div></div>;
    }

    return (
      <Fragment>
        {messages}
        <Form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange}>
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                name="question"
                id="question"
                placeholder="Enter question"
                onChange={this.handleQuestion}
                value={this.state.question}
              />
              <Button className="add__button" variant="secondary" onClick={this.addOptions}><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Add option</Button>
            </div>
            <Fragment>
              {Object.keys(this.state.options).map((option, index) => (
                <span key={index}>
                  <Form.Label>Option #{index + 1}</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="option"
                      id={this.state.options[index].optionId}
                      placeholder="Enter option"
                      onChange={this.handleText(index)}
                      value={option.optionName}
                    />
                    {(this.state.subQasAdded.includes(this.state.options[index].optionId)) ? (
                      <Button className="add__button" variant="secondary" disabled>
                        <i className="fa fa-check-circle mr-2" aria-hidden="true"></i>
                        <span>Added</span>
                      </Button>
                    ) : (
                        <Fragment>
                          <Button className="add__button" variant="danger" onClick={this.handleDelete(index)}>X</Button>
                          <Button className="add__button" variant="primary" onClick={() => this.addSubQuestion(this.state.options[index].optionId, this.state.options[index].optionName)}>
                            <i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>
                            <span>Sub-Question</span>
                          </Button>
                        </Fragment>
                      )
                    }
                  </div>
                </span>
              ))}
              <Button className="sub__button mt-3" variant="success" type="submit">Submit Question</Button>
            </Fragment>
          </Form.Group>
        </Form>
        {subqacontainer}
      </Fragment>
    )
  }
}

export default QuestionAnswers;