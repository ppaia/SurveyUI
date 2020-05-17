import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

class SubQuestionAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            options: [{
                optionId: "",
                optionName: ""
            }]
        };
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

    handleQuestion = (e) => {
        e.preventDefault()
        let question = e.target.value;
        this.setState({
            question
        })
    }

    render() {
        return (
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
                        <Button className="add__button" variant="secondary" onClick={this.addOptions}><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Add option</Button>
                    </div>
                    <p>{this.state.question}</p>
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
                                    <Button className="add__button" variant="danger" onClick={this.handleDelete(index)}>X</Button>
                                </div>
                                <p>{this.state.options[index].optionName}</p>
                            </span>
                        ))}
                    </Fragment>
                </Form.Group>
            </Form>
        );
    }
}

export default SubQuestionAnswers;