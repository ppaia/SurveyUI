import React from 'react';
import classes from './ProductPage.module.css';
import { Breadcrumb, Button, ButtonGroup } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import Size from '../Size/Size';
import Color from '../Color/Color';
import Accordion from '../product-accordion/accordion';
class ProductPage extends React.Component {
    // constructor() {
    //     super();
    //     this.onColorClick = this.onColorClick.bind(this);
    //     this.onimageHandler= this.onimageHandler.bind(this)
    // }
    state = {
        RatingValue: 0,
        quantity: 1,
        disabled: true
    }
    quantityLess() {
        if (this.state.quantity <= 1) {
            this.setState({ disabled: true })
        }
        else {
            this.setState((prevState) => ({
                quantity: prevState.quantity - 1,
                disabled: false
            }))
        }
    }
    quantityMore() {
        this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
            disabled: false
        }))
    }
    ratingCalculator() {
        let rating = 0;
        let numOfRatings = 0;
        if (this.props.product.review && this.props.product.review.reviews) {
            numOfRatings = this.props.product.review.reviews.length;
            this.props.product.review.reviews.map(review => {
                return rating += review.rating
            });
        }
        rating /= numOfRatings;
        this.setState({ RatingValue: Math.ceil(rating) });
    }

    // onColorClick(color) {
    //     this.setState({ defaultColor: color })
    // }
    componentDidMount() {
        this.ratingCalculator();
         //this.props.expandColor(false);
        // this.sizesHandler();
        // this.colorHandler();
    }

    expandColor(openState) {
         this.props.expandColorFn(false);
    }
    // onimageHandler(img){
    //     this.setState({images:img})
    //     console.log("in product Page after return from color",img)
    // }
    render() {
        // let percentOff = "";
        // if (this.props.product.pricing && this.props.product.pricing.price.tieredPrice[1] != null && this.props.product.pricing.price.tieredPrice[1].values[0].percentOff) {
        //     percentOff = this.props.product.pricing.price.tieredPrice[1].values[0].percentOff[0];
        // } else {
        //     percentOff = "";
        // }
        console.log("product props", this.props);
        return (
            <div className={classes.productPage}>
                <div className={classes.Breadcrumb}>
                    <Breadcrumb >
                        <Breadcrumb.Item href="#">Macy's</Breadcrumb.Item>
                        {(this.props.product.relationships) ? this.props.product.relationships.taxonomy.categories.map((category, index) => {
                            return (<Breadcrumb.Item href="#" key={index}>{category.name}</Breadcrumb.Item>);
                        }) : ""}
                    </Breadcrumb>
                </div>
                <div className="pdpDetails common-clearfix row">
                    <div className="image-grid-container common-clearfix col-lg-6">
                        <div className="image-grid-col50">
                            <div className={classes.imagegrid}>
                                {(this.props.product.imagery) ? <ImageCarousel productImage={this.props.product.imagery} key={Math.random(0, 1)} /> : ""}
                            </div>
                        </div>
                    </div>
                    <div className={classes.pdpDescriptionContainer}>
                        <div className={classes.pdpPriceInfo}>
                            <div>
                                <h4 className={classes.pdpTitle}><a href="/">{(this.props.product.detail) ? this.props.product.detail.brand.name : ""}</a></h4>
                                <h1 className={classes.pdpDetails}>{(this.props.product.detail) ? this.props.product.detail.name : ""}</h1>
                            </div>

                            <div className={classes.review}>
                                <div className={classes.starRating}>
                                    <StarRatingComponent
                                        name="review"
                                        value={this.state.RatingValue}
                                        starCount={5}

                                        starColor="#000"
                                        emptyStarColor="#959499"
                                        editing={false}
                                    />  <span><a href="/"> {(this.props.product.review) ? this.props.product.review.reviews.length : ""} Reviews </a></span>
                                </div>
                                <div>
                                    <a href="/">5 Questions & 5 Answers</a>
                                </div>
                            </div>


                            {(this.props.product.pricing) ? <div className={classes.PriceType}>{this.props.product.pricing.price.priceType.text}</div> : ""}

                            {(this.props.product.pricing) ?
                                <div className={classes.pdpOriginalPrice}>
                                    $ {this.props.product.pricing.price.tieredPrice[0].values[0].value}
                                </div> 
                                : 
                                ""
                            }
                            {this.props.product.pricing && this.props.product.pricing.price.tieredPrice[1] && this.props.product.pricing.price.tieredPrice[1].label === "Now [PRICE]" ?
                                <div className={classes.pdpNowPrice}>
                                    Now {this.props.product.pricing.price.tieredPrice[1].values[0].formattedValue} &nbsp;
                                    <span>
                                            ({this.props.product.pricing.price.tieredPrice[1].values[0].percentOff[0]} %off)
                                    </span> &nbsp;
                                    {/* <span className={classes.pdpgrey}>{this.props.product.pricing.price.priceType.saleEnds}</span> */}
                                </div>
                                :
                                ""
                            }

                            {this.props.product.pricing && this.props.product.pricing.price.tieredPrice[2] ?
                                <div className={classes.pdpSellingPrice}>
                                    Sale {this.props.product.pricing.price.tieredPrice[2].values[0].formattedValue} &nbsp;
                                <span>
                                        ({this.props.product.pricing.price.tieredPrice[2].values[0].percentOff[0]} %off)
                                </span> &nbsp;
                                    <span className={classes.pdpgrey}>{this.props.product.pricing.price.priceType.saleEnds}</span>
                                </div>
                                :
                                ""
                            }
                            
                            {this.props.product.pricing.badgesMap ?
                                <div className={classes.offers}>
                                    <span className={classes.OffersBadge}>
                                        {
                                            Object.keys(this.props.product.pricing.badgesMap).map((badge, index) => {
                                                return <div key={index}>
                                                    {this.props.product.pricing.badgesMap[badge].header}
                                                    <span className={classes.Details}>
                                                        <u>Details</u>
                                                    </span>
                                                </div>
                                            })
                                        }
                                    </span>
                                    {/*<span className={classes.MoreOffers}><u>More Offers</u></span>*/}
                                </div>
                                : ""
                            }
                            <hr></hr>
                            {/*
                            <Color colorsArray={this.props.product.traits.colors.colorMap} key={Math.random(0, 1)} onColorsLoad={this.props.onColorsLoad} urlTemplate={this.props.product.urlTemplate} selectedColor={this.props.product.traits.colors.selectedColor} />
                            {this.props.product.sizes ? <Size sizesArray={this.props.product.sizes} key={Math.random(0, 1)} /> : <Size sizesArray={this.props.product.traits.colors.colorMap[Object.keys(this.props.product.traits.colors.colorMap)[0]]} key={Math.random(0, 1)} />}*/}

                            <div className={classes.colorName}>
                                Color:{this.props.product.traits.colors.colorName ?
                                    <span>{this.props.product.traits.colors.colorName.name}</span>
                                    :
                                    <span>{this.props.product.traits.colors.colorMap[Object.keys(this.props.product.traits.colors.colorMap)[0]].name}</span>}
                            </div>
                            <Color colorsArray={this.props.product.traits.colors.colorMap} 
                            key={Math.random(0, 1)} 
                            onColorsLoad={this.props.onColorsLoad} 
                            onSetColorName={this.props.onSetColorName} 
                            SelectedColor={this.props.product.traits.colors.colorName ? this.props.product.traits.colors.colorName: this.props.product.traits.colors.colorMap[Object.keys(this.props.product.traits.colors.colorMap)[0]]} 
                            expandColorFn= {this.props.expandColorFn}
                            expandColor={this.props.expandColor}
                            />
                            {this.props.product.traits && this.props.product.traits.sizes &&
                                <Size sizeMap={this.props.product.traits.sizes.sizeMap} 
                                SelectedColor={this.props.product.traits.colors.colorName ? this.props.product.traits.colors.colorName: this.props.product.traits.colors.colorMap[Object.keys(this.props.product.traits.colors.colorMap)[0]]} 
                                key={Math.random(0, 1)} 
                                expandSizeFn= {this.props.expandSizeFn}
                                expandSize={this.props.expandSize}
                                className={classes.SizeDiv}
                                />
                            }

                            {/* {console.log(this.props.product.traits.sizes.sizeMap)} */}
                            <div className={classes.Quantity}>
                                <span>Qty: </span><span className={classes.quantValue}> {this.state.quantity} </span>&nbsp;&nbsp;
                            <span>
                                    <ButtonGroup className={classes.lessMoreButton}>
                                        <Button onClick={() => this.quantityLess()} disabled={this.state.disabled} className={classes.Minus}>-</Button>
                                        <Button onClick={() => this.quantityMore()} className={classes.Plus}>+</Button>
                                    </ButtonGroup>
                                </span>
                            </div>
                            <div className={classes.pdpButton}>
                                <Button className={classes.AddToBag} >Add to bag</Button> &nbsp;
                                <Button className={classes.AddToList}>Add to List</Button>
                            </div>
                            <Accordion product={this.props.product} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;