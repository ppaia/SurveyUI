import React, { Component } from 'react';
import classes from './ImageCarousel.module.css';
import { Image, Container, Row, Col } from 'react-bootstrap';
import Zoom from 'react-img-zoom';
//import zoom from '../ImageCarousel/zoom'; 

class ImageCarousel extends Component {
    state = {
        activeClassIndex: 0,
        imageIndex:1,
        currentSrcPath: this.imageSrcHandler(this.props.productImage.images[0].filePath)
    }

    componentDidMount() {
        this.setState({ currentSrcPath: this.imageSrcHandler(this.props.productImage.images[0].filePath) });
        console.log("componentDidUpdate", this.imageSrcHandler(this.props.productImage.images[0].filePath));
        this.imageSrcHandler();
    }

    imageLoadHandler(imagePath, index) {
        this.setState({ activeClassIndex: index, currentSrcPath: this.imageSrcHandler(imagePath) });
    }
    componentWillReceiveProps(nextprops) {
        let srcUrl = "https://slimages.macysassets.com/is/image/MCY/products/";
        let srcPath = "";
        if (nextprops.productImage.images) {
            srcPath = nextprops.productImage.images.map((imagePath, index) => {
                return srcUrl + imagePath.filePath
            })
        }
        this.setState({ImageArray: srcPath, imageIndex:1, activeClassIndex:0, showImage:""})
    }

    imageSrcHandler(srcPath) {
        let srcUrl = "https://slimages.macysassets.com/is/image/MCY/products/";
        return srcUrl + srcPath;
    }
    nextSlide() {
        if(this.props.productImage.images && this.props.productImage.images.length > 0) {
            let sliderThumbHeight = Math.abs(parseFloat(window.getComputedStyle(this.refs.sliderThumb).getPropertyValue("height")),10);
            let totalImages = this.props.productImage.images.length;
            if(totalImages - this.state.imageIndex >= 4) {  
                let index = this.state.imageIndex+1;
                this.setState({imageIndex: index});
                let topVal = Math.abs(parseFloat(window.getComputedStyle(this.refs.sliderBlock).getPropertyValue("top")),10);
                let top = topVal + sliderThumbHeight;
                this.refs.sliderBlock.style.top = "-" + top + "px";
            }
        }
    }

    prevSlide() {
        if(this.props.productImage.images && this.props.productImage.images.length > 0) {
            let sliderThumbHeight = Math.abs(parseFloat(window.getComputedStyle(this.refs.sliderThumb).getPropertyValue("height")),10);
            if(this.state.imageIndex > 1) {
                let index = this.state.imageIndex-1;
                this.setState({imageIndex: index});
                let topVal = parseFloat(window.getComputedStyle(this.refs.sliderBlock).getPropertyValue("top"));
                let top = topVal + sliderThumbHeight;
                this.refs.sliderBlock.style.top = top + "px";
            }
        }
    }

    render() {
        let srcPath = <p>No Image available</p>;
        if (this.props.productImage.images) {
            srcPath = this.props.productImage.images.map((imagePath, index) => {
                return (
                    <Row xs={2} md={3} ref="sliderThumb" className={[classes.sliderThumb]} onClick={() => this.imageLoadHandler(imagePath.filePath, index)} key={index}>
                        <Image src={this.imageSrcHandler(imagePath.filePath)} thumbnail className={this.state.activeClassIndex === index ? classes.activeImage : classes.InActiveImage} />
                    </Row>
                );
            })
        }
        let showDownArray = this.props.productImage.images && this.props.productImage.images.length > 0 ?
            (this.props.productImage.images.length - this.state.imageIndex) >= 4 ? classes.shown : classes.hidden : classes.hidden
        return (
            <div className={classes.slider}>
                <div className={classes.sliderArea}>
                    <Container className={[classes.Carousel, classes.sliderContainer]}>
                        <Col className={classes.sliderBlock} ref="sliderBlock">
                            {srcPath}
                        </Col>
                    </Container>
                    <a className={[classes.sliderControTop, this.state.imageIndex > 1 ? classes.shown : classes.hidden].join(' ')} onClick={() => this.prevSlide()}>
                        <i className={classes.arrowUp}></i>
                    </a>
                    <a className={[classes.sliderControlBottom, showDownArray].join(' ')} onClick={() => this.nextSlide()}>
                        <i className={classes.arrowDown}></i>
                    </a>
                </div>
                <div >
                    <Zoom  key={this.state.currentSrcPath} img={this.state.currentSrcPath} zoomScale={1.5} zoomPosition="original" zoomMargin={100}
                        height={500}
                        width={400} />
                </div>
            </div>
        );
    }
};

export default ImageCarousel;