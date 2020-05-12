import React, { Component } from 'react';

const question = 'What is the parameter for disliking this product?';

class NoQuest extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this._handleClick = this._handleClick.bind(this);
    }
    _handleClick(event) {
        event.preventDefault();
        const respObj = {
            id: 0,
            question: question,
            option: event.target.value
        }
        this.props.handleQuestClick(respObj);
    }
    render() {
        return (
            <>
                <div className="d-flex justify-content-start mb-2">
                    <div className="img_cont_msg">
                        <img src="https://www.virtualagent-macys.com/Client/images/icon-ui-macys-f-red.svg" className="rounded-circle user_img_msg" />
                    </div>
                    <div className="msg_container">
                        {question}
                    </div>
                </div>
                {
                    <div className="mb-8 ml-4">
                        <button className="btn-oval bt-yes mb-2" style={{ width: '300px' }} value="Brand" onClick={this._handleClick}>Brand</button>
                        <button className="btn-oval bt-yes mb-2" style={{ width: '300px' }} value="Color" onClick={this._handleClick}>Color</button>
                        <button className="btn-oval bt-yes mb-2" style={{ width: '300px' }} value="Size" onClick={this._handleClick}>Size</button>
                        <button className="btn-oval bt-yes mb-2" style={{ width: '300px' }} value="All" onClick={this._handleClick}>All</button>
                    </div>
                }
            </>
        );
    }
}

export default NoQuest;