import React, { Component, Fragment } from 'react';
import MacysHeader from "./components/Header/MacysHeader";
import './App.css';
import './styles.css';
import { connect } from 'react-redux';
import * as actions from './redux/action/index';
import Footer from './components/Footer/Footer';
import ProductPage from './components/ProductPage/ProductPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUser, faCaretDown, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Spinner from './components/Spinner/Spinner';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Survey from './components/Survey';
import RootComponent from "./components/Graphs/RootComponent";
import Surveys from "./components/Graphs/Surveys";
library.add(faSearch, faUser, faCaretDown, faAngleDown, faAngleUp);

class App extends Component {
  constructor() {
    super();
    this.handleData = this.handleData.bind(this);
    this.handleSurvey = this.handleSurvey.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  handleData(productId) {
    this.props.fetchProduct(productId);
    this.props.expandColor(false);
    this.props.expandSize(false);

  }
  handleSurvey(survey) {
    this.props.isSurvey(survey);
  }

  handlePage(page) {
    this.props.isSurvey(false);
    this.props.pageType(page);
  }

  componentDidMount() {
    this.props.fetchProduct();
    this.props.expandColor(false);
    this.props.expandSize(false);
    this.props.isSurvey(false);
    this.props.pageType('pdp');
  }

  render() {
    const { pData } = this.props;
    return (
      <div>
        <MacysHeader handlerFromParent={this.handleData} handlerForSurvey={this.handleSurvey} handlerPageSwitch={this.handlePage} />
        {(this.props.pData && this.props.pData.productData) ? <ProductPage product={this.props.pData.productData} onColorsLoad={this.props.loadColors} onSetColorName={this.props.setColorName} expandColor={this.props.pData.expandColor} expandColorFn={this.props.expandColor} expandSize={this.props.pData.expandSize} expandSizeFn={this.props.expandSize}
        /> : <Spinner />}
        <ImageSlider />
        {
          pData && pData.pageType === 'admin' ?
            <Fragment>
              <RootComponent />
              <Surveys />
            </Fragment>
            :
            <Fragment>
              {
                pData && pData.isSurvey && pData.pageType === 'pdp' && <Survey />
              }
            </Fragment>
        }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('pdata app', state)
  return {
    pData: state.productData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: (productId) => dispatch(actions.fetchProduct(productId)),
    loadColors: (colorMap) => dispatch(actions.loadColors(colorMap)),
    setColorName: (color) => dispatch(actions.setColorName(color)),
    expandColor: (openState) => dispatch(actions.expandColor(openState)),
    expandSize: (openState) => dispatch(actions.expandSize(openState)),
    isSurvey: (openState) => dispatch(actions.isSurvey(openState)),
    pageType: (page) => dispatch(actions.pageType(page))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
