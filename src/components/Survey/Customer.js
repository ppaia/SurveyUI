import React, { Component } from 'react';
import { Form, Container } from 'react-bootstrap';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            gender: '',
            age: '',
            pincode: '',
            page: 'PDP'
        }

        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.props.customerDetails(this.state);
    }

    render() {
        return (
            <Container>
                <Form className="mt-1">
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label className="customer">Name<span style={{ color: 'red' }}> *</span></Form.Label>
                        <Form.Control type="text" name="name" value={this.state.name} onChange={this.onChangeValue} placeholder="Enter your name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label className="customer">Email address</Form.Label>
                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.onChangeValue} placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="customer">Gender</Form.Label>
                        <div onChange={this.onChangeValue}>
                            <input type="radio" value="Male" name="gender" /><span className="gender">Male</span>
                            <input type="radio" value="Female" name="gender" /><span className="gender">Female</span>
                            <input type="radio" value="Won't disclose" name="gender" /><span className="gender">Won't disclose</span>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="customer">Age</Form.Label>
                        <Form.Control as="select" name="age" onChange={this.onChangeValue} value={this.state.age}>
                            <option value="select">--Select--</option>
                            <option value="Below 18">Below 18</option>
                            <option value="18-35">18-35</option>
                            <option value="36-60">36-60</option>
                            <option value="Above 60">Above 60</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="pincode">
                        <Form.Label className="customer">Pincode</Form.Label>
                        <Form.Control type="number" name="pincode" value={this.state.pincode} onChange={this.onChangeValue} placeholder="Enter pincode" />
                    </Form.Group>
                    <button type="submit"
                        disabled={this.state.name === ''}
                        className={`${this.state.name === '' ? "btn-submit-disable" : "btn-submit-enable"}`}
                        onClick={e => this._handleSubmit(e)}>Continue</button>
                </Form>
            </Container>
        );
    }
}

export default Customer;
