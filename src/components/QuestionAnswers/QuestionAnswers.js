import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import "./QA_Styles.css";

class QuestionAnswers extends Component {
  state = {
    question: "",
    options: [{
      optionId: "",
      optionName: ""
    }]
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

  addQuestion = e => {
    e.preventDefault()
    let options = this.state.options.concat([{
      optionId: "",
      optionName: ""
    }])
    this.setState({
      options
    })
  }

  addSubQuestion = (subId, e) => {
    console.log("subId: ", subId);
    console.log("Question: ", this.state.question);
    console.log("Options: ", this.state.options);
  }

  render() {
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
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
              <Button className="add__button" variant="secondary" onClick={this.addQuestion}><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Add option</Button>
            </div>
            <p>{this.state.question}</p>
            {Object.keys(this.state.options).map((option, index) => (
              <span key={index}>
                <Form.Label>Option #{index}</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    name="option"
                    id={this.state.options[index].optionId}
                    placeholder="Enter option"
                    onChange={this.handleText(index)}
                    value={option.optionName}
                  />
                  <Button className="add__button" variant="danger" onClick={this.handleDelete(index)}>X</Button>
                  <Button className="add__button" variant="primary" onClick={() => this.addSubQuestion(this.state.options[index].optionId)}>
                    <i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>
                    <span>Sub-Question</span>
                  </Button>
                </div>
                <p>{this.state.options[index].optionName}</p>
              </span>
            ))}
          </Form.Group>
        </Form>
      </Fragment>
    )
  }
}

export default QuestionAnswers;