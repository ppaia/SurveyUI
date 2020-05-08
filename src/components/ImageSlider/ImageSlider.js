import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
//import 'react-id-swiper/lib/styles/css/swiper.css';
import 'swiper/css/swiper.css';
import classes from './ImageSlider.module.css';
// import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { NONAME } from 'dns';

class ImageSlider extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    axios.get('./productsList.json')
      .then((findresponse) => {
        console.log(findresponse.data)
        this.setState({
          data: findresponse.data
        })
      })
  }
  render() {
    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: NONAME,
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
  paginationClickable: true,
  slidesPerView: 5,
  spaceBetween: 50,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 40
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  }
    }
    const swiperData = () => {
      return
    }
    return (
      <div className={classes.SwiperData}>
        <h6> Customers Also Loved</h6>
        <Swiper {...params}>
        <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[0].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[0].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[0].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[0].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now {this.state.data.product[0].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[0].shipping}</span>:""}
          </div>
          <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[1].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[1].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[1].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[1].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now {this.state.data.product[1].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[1].shipping}</span>:""}
          </div>
          <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[2].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[2].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[2].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[2].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now {this.state.data.product[2].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[2].shipping}</span>:""}
          </div>
          <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[3].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[3].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[3].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[3].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now {this.state.data.product[3].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[3].shipping}</span>:""}
          </div>
          <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[4].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[4].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[4].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[4].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now{this.state.data.product[4].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[4].shipping}</span>:""}
          </div>
          <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[5].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[5].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[5].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[5].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now {this.state.data.product[5].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[5].shipping}</span>:""}
          </div>
          <div className={classes.imagesSlider}>
          {this.state.data.product ? <img src={this.state.data.product[6].productUrl} alt="slider"/> : ""}
          {this.state.data.product ?  <span className={classes.brandName}>{this.state.data.product[6].brand}</span>:""}
          {this.state.data.product ?  <span className={classes.brandDetails}>{this.state.data.product[6].detail}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPrice}>{this.state.data.product[6].originalPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.brandPriceNow}>Now {this.state.data.product[6].currentPrice}</span>:""}
          {this.state.data.product ?  <span className={classes.shippingDetails}> {this.state.data.product[6].shipping}</span>:""}
          </div>
           
        </Swiper>
       
      </div>
    )
  }
}

export default ImageSlider;