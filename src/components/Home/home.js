import React, { Component, Fragment } from 'react';
import '../Home/home.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Rating from 'react-rating';
import ScreenCapture from './SceenCapture'
import homepage from '../../assets/images/currentpage.png'
import footerpng from '../../assets/images/footer.png'
import './style.css';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal:false,
      feedbacktext:"",
      topic:"",
      name: 'GAMO',
      screenCapture: '',
      isimageadded:false
    }
  }

  handleScreenCapture = (screenCapture) => {
    this.setState({
      screenCapture,
      modal:!this.state.modal,
      isimageadded:true
    })
  }

  toggle = () => {
    this.setState({modal:!this.state.modal});
  }

  manageModel=()=>{
    this.setState({modal:false});
    console.log("this state====>managemodel",this.state);
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
    const { screenCapture } = this.state
    console.log("screenCapture=======>",screenCapture);
  return (
    <ScreenCapture onEndCapture={this.handleScreenCapture}
    manageModel={this.manageModel}>
    {({ onStartCapture }) => (
      <Fragment>
    <div>
    <img
    src={homepage}
    alt="IN"
    className="pageimg"
    />

    <img
    src={footerpng}
    alt="IN"
    className="pagfooterpng"
    />
    
    <Fragment>
            <p>
              Page..............
            </p>
            <br/>
            <br/>
            {(screenCapture)?<img src={screenCapture} />:null}
          </Fragment>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.class}>
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <ModalHeader toggle={this.toggle}> <div className="">
          <img src="https://cdn1.austinchamber.com/organizationLogo/organization/logo/3-Macys_Stacked_Thin_190425_204031.jpg?mtime=20190425154032" className="macys_image" />
          <div><b class="feedbackform ">Help us to improve our site!</b></div>

        </div> </ModalHeader>
        <ModalBody>
          <div>

            <b>Overall, how satisfied are you with your Macy's.com experience?</b>

            <br></br>

            <span className="d-flex justify-content-between mb-3 mt-4"><span className="float-left"> Completly Dissatisfied</span>
              <span className="float-right">Completly Satisfied</span></span>

            <Rating
              stop={5}
              emptySymbol={['fa fa-star-o fa-2x medium space_stars', 'fa fa-star-o fa-2x medium space_stars',
                'fa fa-star-o fa-2x medium space_stars', 'fa fa-star-o fa-2x medium space_stars',
                'fa fa-star-o fa-2x medium space_stars', 'fa fa-star-o fa-2x medium space_stars']}
              fullSymbol={['fa fa-star fa-2x medium space_stars', 'fa fa-star fa-2x medium space_stars',
                'fa fa-star fa-2x medium space_stars', 'fa fa-star fa-2x medium space_stars',
                'fa fa-star fa-2x medium space_stars', 'fa fa-star fa-2x medium space_stars']}
            />

            <span className="d-flex mt-4"> How Satisfied you with each of the following? </span>
            <br></br>



            <span className="d-flex justify-content-between mb-3 mt-2"><span className="float-left"> Product Availabality</span>
              <span className="float-right"> <Rating
                stop={5}
                emptySymbol={['fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod',
                  'fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod',
                  'fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod']}
                fullSymbol={['fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod',
                  'fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod',
                  'fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod']}
              /></span></span>

            <div className="d-xl-flex mb-2 mt-1">
              <span className=""> <span className="">Easiness to navigate/search products<span className="spn">*</span> </span>
                <span className="float-right"> <Rating
                  stop={5}
                  emptySymbol={['fa fa-star-o fa-2x medium medium space_stars_prod', 'fa fa-star-o fa-2x medium medium space_stars_prod',
                    'fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod',
                    'fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod']}
                  fullSymbol={['fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod',
                    'fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod',
                    'fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod']}
                /></span></span>
            </div>

            <div className="d-xl-flex mb-2 mt-1">
              <span className=""><span className="">Easiness to check-out/complete purchase<span className="spn">*</span></span>
                <span className="float-right"> <Rating
                  stop={5}
                  emptySymbol={['fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod',
                    'fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod',
                    'fa fa-star-o fa-2x medium space_stars_prod', 'fa fa-star-o fa-2x medium space_stars_prod']}
                  fullSymbol={['fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod',
                    'fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod',
                    'fa fa-star fa-2x medium space_stars_prod', 'fa fa-star fa-2x medium space_stars_prod']}
                /></span></span>
            </div>

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
            <div classname="d-flex mb-3 mt-2">
              Please tell us about your expirence. What can we improve?
              <br></br>
              <textarea id="feddback_text" rows="4" cols="50" name = "feedbacktext" value={this.state.feedbacktext}
                onChange={(e) => this.setValue(e)}/>
            </div>

            Your responses will be used in accordance with our privacy policy


          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <img src="https://cdn.dribbble.com/users/226242/screenshots/5606713/camera.png" 
            disabled='true'
            className="macys_camera" onClick={onStartCapture}/>
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
    </Fragment>
        )}
      </ScreenCapture>
  );
}
    
}

export default Home;







