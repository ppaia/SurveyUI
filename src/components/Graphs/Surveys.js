import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import Modal from "./Modal";

class Surveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            modalData: {},
            errors: [],
            surveyId: 0,
            showPopup: false,
            productName: "NA"
        };
    }

    togglePopup(surveyId, productName) {
        this.setState({
            showPopup: !this.state.showPopup,
            surveyId: surveyId,
            productName: productName
        });
    }

    fetchData() {
        // Where we're fetching data from
        fetch(process.env.REACT_APP_URL + `rest/chatbot/survey/getSurveyData`)
            // We get the API response and receive data in JSON format...
            .then((response) => response.json())
            // ...then we update the users state
            .then((data) => {
                this.setState({
                    tableData: data,
                    isLoading: false,
                })
            })
            // Catch any errors we hit and update the app
            .catch((errors) => {
                this.setState({ errors, isLoading: false })
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        const errorsElement = (this.state.errors) ? <div className="alert alert-danger">{this.state.errors.toString()}</div> : "";

        let tableData = this.state.tableData.map((item, index) => {
            return (<tr key={index} className="bg-light text-dark">
                <td>{item.surveyId}</td>
                <td>{(item.name) ? item.name : "NA"}</td>
                <td>{item.age}</td>
                <td>{(item.email) ? item.email : "NA"}</td>
                <td>{item.gender}</td>
                <td>{(item.pincode) ? item.pincode : "000000"}</td>
                <td>{(item.page) ? item.page : "NA"}</td>
                <td><button className="btn btn-light" onClick={() => this.togglePopup(item.surveyId, item.name)}>View QAs</button></td>
            </tr>);
        });

        let finalTable = "";

        if (this.state.tableData.length) {
            finalTable = <Table className="surbey_table" striped bordered hover size="sm" responsive="sm">
                <thead>
                    <tr className="bg-dark text-light">
                        <th>#</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Pincode</th>
                        <th>Page</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>;
        } else {
            finalTable = "No Data!";
        }

        let tableContainer = "";
        if (!this.state.errors) {
            tableContainer = <div className="row mt-5">
                <div className="col">
                    {finalTable}
                </div>
            </div>;
        }

        return (
            <div>
                <h2 className="mt-3 title_head">Surveys</h2>
                <div className="errors">
                    {errorsElement}
                </div>
                {tableContainer}
                {this.state.showPopup ? (
                    <Modal
                        surveyId={this.state.surveyId}
                        productName={this.state.productName}
                        closePopup={this.togglePopup.bind(this)}
                    />
                ) : null}
            </div>
        );
    }
}

export default Surveys;
