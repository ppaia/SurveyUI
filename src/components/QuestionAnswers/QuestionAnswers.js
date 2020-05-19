import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import SubQuestionAnswers from "./SubQuestionAnswers";
import Modal from "./Modal";
import "./QA_Styles.css";

class QuestionAnswers extends Component {
  state = {
    question: "",
    option: [{
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
    let option = [...this.state.option]
    option[i] = {
      optionId: (e.target.value) ? "option_" + i : "",
      optionName: e.target.value
    }
    this.setState({
      option
    })
  }

  handleDelete = i => e => {
    e.preventDefault()
    let option = [
      ...this.state.option.slice(0, i),
      ...this.state.option.slice(i + 1)
    ]
    this.setState({
      option
    })
  }

  addOptions = e => {
    e.preventDefault()

    if (!this.state.question) {
      alert("Please fill the question first!");
      return false;
    }

    let option = this.state.option.concat([{
      optionId: "",
      optionName: ""
    }])
    this.setState({
      option
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
    console.log("Options: ", this.state.option);
  }

  mergeSubQas = (qaData, e) => {
    e.preventDefault();
    let option = this.state.option;
    let subQasAdded = this.state.subQasAdded;

    option.map((item, index) => {
      if (qaData.qaId === item.optionId) {
        let sub_options = [];
        qaData.option.map((option, idx) => {
          if (option.optionName)
            sub_options.push(option.optionName);
        });
        if (qaData.question && sub_options.length) {
          option[index].option = sub_options;
          option[index].question = qaData.question;
          subQasAdded.push(qaData.qaId);
        } else {
          alert("Sub question and option must not be blank!");
          return false;
        }
      }
    });

    this.setState({
      showPopup: false,
      option,
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

    if (!this.state.option[0].optionName) {
      alert("At-least one option must be there!");
      return false;
    }

    let postObject = {
      "expName": "Exp1",
      "surveyQuiz": [
        {
          "question": this.state.question,
          "option": this.state.option
        }
      ]
    };

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postObject)
    };
    fetch(process.env.REACT_APP_URL + `rest/chatbot/survey/addQuizes`, requestOptions)
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we update the users state
      .then((data) => {
        if (data) {
          let messages = ["Successfully Submitted!"];
          this.setState({
            messages
          });
        }
      })
      // Catch any errors we hit and update the app
      .catch((errors) => {
        this.setState({ errors, isLoading: false })
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
              {Object.keys(this.state.option).map((option, index) => (
                <span key={index}>
                  <Form.Label>Option #{index + 1}</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="option"
                      id={this.state.option[index].optionId}
                      placeholder="Enter option"
                      onChange={this.handleText(index)}
                      value={option.optionName}
                    />
                    {(this.state.subQasAdded.includes(this.state.option[index].optionId)) ? (
                      <Button className="add__button" variant="secondary" disabled>
                        <i className="fa fa-check-circle mr-2" aria-hidden="true"></i>
                        <span>Added</span>
                      </Button>
                    ) : (
                        <Fragment>
                          <Button className="add__button" variant="danger" onClick={this.handleDelete(index)}>X</Button>
                          <Button className="add__button" variant="primary" onClick={() => this.addSubQuestion(this.state.option[index].optionId, this.state.option[index].optionName)}>
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