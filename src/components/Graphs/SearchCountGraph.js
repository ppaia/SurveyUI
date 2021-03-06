import React, { Component } from "react";
import { Chart } from "react-google-charts";
import Loader from 'react-loader-spinner';

class SearchCountGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            graphData: [],
            qid: this.props.qid,
            title: "QA Graph"
        };
    }

    fetchGraphsData() {
        // Where we're fetching data from
        fetch(process.env.REACT_APP_URL + `rest/chatbot/survey/getSurveyCountByQuestion/` + this.state.qid)
            // We get the API response and receive data in JSON format...
            .then((response) => response.json())
            // ...then we update the users state
            .then((data) => {

                let requiredData = [
                    ['Searched', 'Count']
                ];

                Object.keys(data.answers).map(key => {
                    return requiredData.push([key, data.answers[key]]);
                });

                this.setState({
                    graphData: requiredData,
                    isLoading: false,
                    title: data.question
                })
            })
            // Catch any errors we hit and update the app
            .catch((errors) => {
                this.setState({ errors, isLoading: false })
            });
    }

    componentDidMount() {
        this.fetchGraphsData();
    }

    render() {
        const errorsElement = (this.state.errors.length) ? <div className="errors m-3"><div className="alert alert-danger">{this.state.errors.toString()}</div></div> : "";
        let graphElement = "";
        if (this.state.graphData.length) {
            graphElement = <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<Loader
                    className="bars_loader"
                    type="Bars"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    timeout={5000} //3 secs
                />}
                data={(this.state.graphData.length) ? this.state.graphData : ""}
                options={{
                    title: this.state.title,
                    // Just add this option
                    is3D: true,
                    fontSize: 16,
                    titleTextStyle: {
                        color: "#504334",    // any HTML string color ('red', '#cc00cc')
                        fontName: "Roboto", // i.e. 'Times New Roman'
                        fontSize: 16, // 12, 18 whatever you want (don't specify px)
                        bold: false,    // true or false
                        italic: false,  // true of false
                        alignment: "center"
                    },
                    legend: {
                        position: 'right',
                        textStyle: {
                            color: 'green',
                            fontSize: 16
                        },
                        alignment: "center"
                    },
                    chartArea: {
                        left: 10,
                        top: '25%',
                        width: '100%',
                        height: '75%'
                    }
                }}
                rootProps={{ 'data-testid': '2' }}
            />;
        }
        return (
            <div className="chartGraphBox">
                {errorsElement}
                {graphElement}
            </div>
        );
    }
}

export default SearchCountGraph;