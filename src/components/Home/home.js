import React, { Component } from 'react';
import '../Home/home.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Rating from 'react-rating';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal:false,
      feedbacktext:"",
      topic:""
    }
  }

  toggle = () => {
    this.setState({modal:!this.state.modal});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("this state====>222",this.state);
    alert("submited....");
  };

  setValue = (event) => {
    const {
      target: { name, value },
    } = event;
    console.log("[name]: value ====>", [name], value);
    this.setState({ [name]: value });
  };

  render(){
  return (
    <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.class}>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <ModalHeader toggle={this.toggle}> <div className="">
          <img src="https://cdn1.austinchamber.com/organizationLogo/organization/logo/3-Macys_Stacked_Thin_190425_204031.jpg?mtime=20190425154032" className="macys_image" />
        </div></ModalHeader>
        <ModalBody>
          <div>

            <div>
              <b class="feedbackform ">Help us to improve our site!</b> <br></br>
              <br></br>
              <b>Overall, how satisfied are you with your Macy's.com experience?</b>

              <br></br>

              <span className="d-flex justify-content-between mb-3 mt-2"><span className="float-left"> Completly dissatisfied</span>
                <span className="float-right">Completly dissatisfied</span></span>

              <Rating
                stop={6}
                emptySymbol={['fa fa-star-o fa-2x medium space_stars', 'fa fa-star-o fa-2x medium space_stars',
                  'fa fa-star-o fa-2x medium space_stars', 'fa fa-star-o fa-2x medium space_stars',
                  'fa fa-star-o fa-2x medium space_stars', 'fa fa-star-o fa-2x medium space_stars']}
                fullSymbol={['fa fa-star fa-2x medium space_stars', 'fa fa-star fa-2x medium space_stars',
                  'fa fa-star fa-2x medium space_stars', 'fa fa-star fa-2x medium space_stars',
                  'fa fa-star fa-2x medium space_stars', 'fa fa-star fa-2x medium space_stars']}
              />

            </div>
            <span className="d-flex mt-4"> How Satisfied you with each of the following? </span>
            <br></br>



            <span className="d-flex justify-content-between mb-3 mt-2"><span className="float-left"> Product Availabality</span>
              <span className="float-right"> <Rating
                stop={6}
                emptySymbol={['fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                  'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                  'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium']}
                fullSymbol={['fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                  'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                  'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium']}
              /></span></span>


            <span className="d-flex justify-content-between mb-3 mt-2"><span className="float-left"> Easiness to navigate/search products*</span>
              <span className="float-right"> <Rating
                stop={6}
                emptySymbol={['fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                  'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                  'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium']}
                fullSymbol={['fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                  'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                  'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium']}
              /></span></span>



            <br></br>

            <Rating
              stop={6}
              emptySymbol={['fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium']}
              fullSymbol={['fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium']}
            />

            <br></br>

            <span> Easiness to check-out/complete Purchase* </span>

            <Rating
              stop={6}
              emptySymbol={['fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium']}
              fullSymbol={['fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium']}
            />
            <br></br>


            <div>
              Please select your feedback topic.
              <select id="feedbac" class="arrows" name ="topic" value={this.state.topic}
                onChange={(e) => this.setValue(e)}>
                <option value="defalult"> Please Select Option</option>
                <option value="order">Order Issue / Status</option>
                <option value="error">Website Error/Issue</option>
                <option value="product">Product related query</option>
                <option value="search">Search/Navigation Issue</option>
                <option value="suggestions"> General Suggestion/Comment</option>
                <option value="account">Macys Account Question/Issue</option>

              </select>
            </div>
            <br></br>
            <br></br>
            <div>
              Please Tell us about your expirence. What can we imporve?
              <br></br>
              <textarea id="feddback_text" rows="4" cols="50" name = "feedbacktext" value={this.state.feedbacktext}
                onChange={(e) => this.setValue(e)}/>
            </div>

            Your responses will be used in accordance wiht our <span class="spn">privacy policy</span>




          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <img src="https://cdn.dribbble.com/users/226242/screenshots/5606713/camera.png" className="macys_camera" />
          </div>
          <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
          <Button color="danger" type="submit">Submit</Button>
        </ModalFooter>
        </form>
      </Modal>
      <div id="mySidenav" class="sidenav">
      <Button id="about" color="danger" onClick={this.toggle}><span class="feedbacktxt">Feedback Form</span></Button>
</div>
    </div>
  );
}
    
}

export default Home;







