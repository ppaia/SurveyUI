import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Customer from './Customer';

class Chatbot extends Component {
    messagesEnd;
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            respSurvey: [],
            answers: [],
            isCustomer: true,
            count: 0,
            surveyId: 0,
            comments: ''
        }
    }
    componentDidMount() {
        axios.get('http://c6c61b29.ngrok.io/rest/chatbot/survey/pdp/getsurvey')
            .then(res => {
                const survey = res.data;
                this.setState({ survey });
            })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    _handleClick = (e) => {
        e.preventDefault();
        const respObj = {
            id: this.state.survey[this.state.count].id,
            question: this.state.survey[this.state.count].question,
            option: e.target.value
        }
        const ansObj = {
            quizId: this.state.survey[this.state.count].id,
            answer: e.target.value
        }
        this.setState({ answers: [...this.state.answers, ansObj] })
        this.setState({ respSurvey: [...this.state.respSurvey, respObj] })
        this.setState({ count: this.state.count + 1 });
        this.renderCard(this.state.survey);
    }

    _handleCustomer = async customer => {
        const user = {
            name: customer.name,
            email: customer.email,
            gender: customer.gender,
            age: customer.age,
            page: customer.page,
            pincode: customer.pincode
        };

        const result = await axios.post(`http://c6c61b29.ngrok.io/rest/chatbot/survey/loadsurveydata `, user);
        const res = await result.data;
        this.setState({ surveyId: res.surveyId })
        this.setState({ isCustomer: !this.state.isCustomer })
    }

    _handleSubmit = async e => {
        e.preventDefault();
        const survey = {
            surveyId: this.state.surveyId,
            answers: this.state.answers
        }
        const result = await axios.post(`http://c6c61b29.ngrok.io/rest/chatbot/survey/save `, survey);
        const res = await result.data;
    }

    _handleChange = e => {
        e.preventDefault();
        this.setState({ comments: e.target.value })
    }

    renderRespSurvey() {
        return (
            this.state.respSurvey.map((survey, i) => {
                return (
                    <div key={i}>
                        <div className="d-flex justify-content-start mb-2">
                            <div className="img_cont_msg">
                                <img src="https://www.virtualagent-macys.com/Client/images/icon-ui-macys-f-red.svg" className="rounded-circle user_img_msg" />
                            </div>
                            <div className="msg_container">
                                {survey.question}
                            </div>
                        </div>
                        {
                            (survey.option === 'Y' || survey.option === 'N') &&
                            <div className="d-flex justify-content-center mb-2">
                                <button className="btn-oval bt-yes">Yes</button>
                                <button className="btn-oval bt-no">No</button>
                            </div>
                        }
                        <div className="d-flex justify-content-end mb-2">
                            {
                                (survey.option === 'Y' || survey.option === 'N') ?
                                    <button className={`btn-oval ${survey.option === 'Y' ? 'bt-yes' : 'bt-no'}`}>{survey.option === 'Y' ? 'Yes' : 'No'}</button>
                                    : this.state.comments
                            }

                            <div className="img_cont_msg">
                                <img src={require('../../images/user.png')} class="rounded-circle user_img_msg" />
                            </div>
                        </div>
                    </div >
                )
            })
        )
    }

    renderQuestions(survey) {
        return (
            <>
                <div className="d-flex justify-content-start mb-2">
                    <div className="img_cont_msg">
                        <img src="https://www.virtualagent-macys.com/Client/images/icon-ui-macys-f-red.svg" className="rounded-circle user_img_msg" />
                    </div>
                    <div className="msg_container">
                        {survey.length > 0 && `${survey[this.state.count].question}`}
                    </div>
                </div>
                {
                    survey[this.state.count].option === 'Comments' ?
                        <div className="d-flex justify-content-center mb-2">
                            <Form.Group controlId="exampleForm.ControlTextarea1" onBlur={e => this._handleClick(e)}>
                                <Form.Control as="textarea" rows="3" columns="10" value={this.state.comments} onChange={e => this._handleChange(e)} />
                            </Form.Group>
                        </div>
                        :
                        <div className="d-flex justify-content-center mb-2">
                            <button className="btn-oval bt-yes" value="Y" onClick={e => this._handleClick(e)}>Yes</button>
                            <button className="btn-oval bt-no" value="N" onClick={e => this._handleClick(e)}>No</button>
                        </div>
                }
            </>
        )
    }

    renderCard(survey) {
        return (
            <div className="card-body msg_card_body">
                {
                    this.state.respSurvey.length > 0 &&
                    this.renderRespSurvey()
                }
                {
                    this.state.respSurvey.length < this.state.survey.length &&
                    this.renderQuestions(survey)
                }
                {
                    this.state.respSurvey.length === this.state.survey.length &&
                    <button type="submit" className="btn-submit-enable"
                        onClick={e => this._handleSubmit(e)}>Submit</button>
                }
            </div>
        )
    }
    
    render() {
        return (
            <div class="container">
                <div class="row justify-content-end chat">
                    <div class="card">
                        <div class="card-header msg_head">
                            <div class="d-flex bd-highlight">
                                <div class="img_cont">
                                    <img src="https://www.virtualagent-macys.com/Client/images/icon-ui-macys-f-red.svg" class="rounded-circle user_img" />
                                    {/* <img src={require('../images/chatbot-macys.png')} class="rounded-circle user_img" /> */}
                                    <span class="online_icon"></span>
                                </div>
                                <div class="user_info">
                                    <span>Macy's Virtual Agent</span>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.isCustomer &&
                            <div>
                                <Customer customerDetails={this._handleCustomer} />
                            </div>
                        }
                        {
                            !this.state.isCustomer && this.state.survey.length > 0 &&
                            this.renderCard(this.state.survey)
                        }
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chatbot;