import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

class SubQuestionAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qaId: this.props.subId,
            question: "",
            option: [{
                optionId: "",
                optionName: ""
            }]
        };
    }

    handleText = i => e => {
        let option = [...this.state.option]
        option[i] = {
            optionId: (e.target.value) ? "sub_option_" + i : "",
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
        }]);

        this.setState({
            option
        })
    }

    handleQuestion = e => {
        e.preventDefault()
        let question = e.target.value;
        this.setState({
            question
        })
    }

    handleChange = e => {
        e.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.props.mergeSubQas.bind(this, this.state)} onChange={this.handleChange}>
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
                                    <Button className="add__button" variant="danger" onClick={this.handleDelete(index)}>X</Button>
                                </div>
                            </span>
                        ))}
                    </Fragment>
                </Form.Group>
                <Button className="sub__button" variant="success" type="submit">Add Question</Button>
            </Form>
        );
    }
}

export default SubQuestionAnswers;
