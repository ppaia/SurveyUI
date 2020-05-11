import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Customer from './Customer';
import SurveyComplete from './SurveyComplete';
import { connect } from 'react-redux';
import * as actions from '../../redux/action/index';

class Survey extends Component {
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
            comments: '',
            surveyComplete: false
        }
    }
    componentDidMount() {
        axios.get('http://abd936f7.ngrok.io/rest/chatbot/survey/pdp/getsurvey')
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

        const result = await axios.post(`http://abd936f7.ngrok.io/rest/chatbot/survey/loadsurveydata `, user);
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
        const result = await axios.post(`http://abd936f7.ngrok.io/rest/chatbot/survey/save `, survey);
        this.setState({ surveyComplete: !this.state.surveyComplete })
    }

    _handleChange = e => {
        e.preventDefault();
        this.setState({ comments: e.target.value })
    }

    _handleClose = e => {
        e.preventDefault();
        this.props.isSurvey(false);
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
                            <div className="d-flex justify-content-start mb-4 ml-4">
                                <button className="btn-oval bt-yes">Yes</button>
                                <button className="btn-oval bt-no">No</button>
                            </div>
                        }
                        <div className="d-flex justify-content-end mb-5">
                            {
                                (survey.option === 'Y' || survey.option === 'N') ?
                                    <button className={`btn-oval ${survey.option === 'Y' ? 'bt-yes' : 'bt-no'}`}>{survey.option === 'Y' ? 'Yes' : 'No'}</button>
                                    :
                                    <div className="user_msg_container">
                                        {this.state.comments}
                                    </div>
                            }

                            <div className="img_cont_msg">
                                <img src={require('../../images/user.png')} className="rounded-circle user_img_msg" />
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
                        <div className="d-flex justify-content-start mb-2">
                            <div>
                                <Form.Group controlId="comments" onBlur={e => this._handleClick(e)}>
                                    <Form.Control as="textarea" className="comments ml-1" rows="3" value={this.state.comments} onChange={e => this._handleChange(e)} />
                                </Form.Group>
                            </div>
                            <div>
                                <img src={require('../../images/right_red.png')} onClick={e => this._handleChange(e)} className="rounded-circle next_img_msg" />
                            </div>
                        </div>
                        :
                        <div className="d-flex justify-content-start mb-4 ml-4">
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
            <div className="container">
                <div className="row justify-content-end chat">
                    <div className="card">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img src="https://www.virtualagent-macys.com/Client/images/icon-ui-macys-f-red.svg" className="rounded-circle user_img" />
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span>Macy's Survey</span>
                                </div>
                                <div id="action_menu_btn">
                                    <img src={require('../../images/close-icon.png')} onClick={this._handleClose} className="rounded-circle close_img" />
                                </div>
                            </div>
                        </div>
                        {!this.state.surveyComplete ?
                            <>
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
                            </>
                            :
                            <SurveyComplete />
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

const mapStateToProps = state => {
    return {
        pData: state.productData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        isSurvey: (openState) => dispatch(actions.isSurvey(openState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);