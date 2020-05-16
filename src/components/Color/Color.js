import React, { Component } from 'react';
import { Collapse, Image } from 'react-bootstrap';
import classes from './Color.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Color extends Component {
    state = {
        open: false,
        disabled: true
        
    }
    colorUpdate(color) {
        this.props.onColorsLoad(this.props.colorsArray[color]);
        this.props.onSetColorName(this.props.colorsArray[color]);
        console.log(this.props.colorsArray[color].name);

    }

    expandColor(openState) {
        this.props.expandColorFn(openState);
    }
    // componentDidMount() {
    //     this.props.expandColor(false);
    // }
    render() {
        return (
            <div>
                {/*<span>Color:
                    {this.state.selectedColor ? this.props.colorsArray[this.state.selectedColor].name : this.props.colorsArray[Object.keys(this.props.colorsArray)[0]].name}
                    <br></br>
                </span>*/}


                {(Object.keys(this.props.colorsArray).length > 6) ?
                    (!this.props.expandColor) ?
                        <span className={classes.span}
                            onClick={
                                    () => this.expandColor(true)
                                }
                            aria-controls="example-collapse-text"
                            aria-expanded={this.props.expandColor}>
                            See All Colors <br/><FontAwesomeIcon icon="angle-down" />
                        </span> :
                        <span className={classes.span}
                            onClick={ 
                                    () => this.expandColor(false)
                                }
                            aria-controls="example-collapse-text"
                            aria-expanded={this.props.expandColor}>
                            See Fewer Colors <br/> <FontAwesomeIcon icon="angle-up"/>
                        </span>
                    :
                    ""}
                {/*  style={{ backgroundImage: `url(${this.props.urlTemplate.swatch}${this.props.colorsArray[color].swatchImage.filePath})` }}*/}
                <Collapse in={true}>
                    <span className={classes.colorsList}>{Object.keys(this.props.colorsArray).slice(0, 9).map((color, index) => (
                        <span key={index} className={color === this.props.SelectedColor.id ? classes.ActiveClass : classes.InActiveClass}>
                            <Image
                                className={[classes.ColorIcon]}
                                src={'https://slimages.macysassets.com/is/image/MCY/products/' + this.props.colorsArray[color].swatchImage.filePath}
                                onClick={() => this.colorUpdate(color)} >
                            </Image>
                        </span>
                    ))}
                    </span>
                </Collapse>
                <Collapse in={this.props.expandColor}>
                    <span className={classes.colorsList}>{Object.keys(this.props.colorsArray).slice(9, Object.keys(this.props.colorsArray).length).map((color, index) => (
                        <span key={index} className={color === this.props.SelectedColor.id ? classes.ActiveClass : classes.InActiveClass}>
                            <Image
                                className={[classes.ColorIcon]}
                                src={'https://slimages.macysassets.com/is/image/MCY/products/' + this.props.colorsArray[color].swatchImage.filePath}
                                onClick={() => this.colorUpdate(color)}>
                            </Image>
                        </span>
                    ))}
                    </span>
                </Collapse>
                <div className={classes.SizeChartDiv}><a href="/" className={classes.sizeChart}>Find Your True Fit</a></div>
            </div>
        );
    }
}
export default Color;